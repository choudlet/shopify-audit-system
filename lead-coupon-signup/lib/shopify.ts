import { prefixedTag, type NormalizedLeadPayload } from "./validation";

const SHOPIFY_API_VERSION = "2026-04";
const WELCOME_OFFER_TAG = "welcome_offer_5_off_20";

type ShopifyCustomer = {
  id: string;
  note?: string | null;
  tags?: string[];
};

type ShopifyUserError = {
  field?: string[];
  message: string;
};

type ShopifyResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

type UpsertCustomerResult = {
  customerId: string;
  action: "created" | "updated";
  shouldSendWelcome: boolean;
  alreadyHadWelcomeOffer: boolean;
};

const CREATE_CUSTOMER_MUTATION = `
  mutation CustomerCreate($input: CustomerInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const UPDATE_CUSTOMER_MUTATION = `
  mutation CustomerUpdate($input: CustomerInput!) {
    customerUpdate(input: $input) {
      customer {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const FIND_CUSTOMER_QUERY = `
  query FindCustomer($query: String!) {
    customers(first: 1, query: $query) {
      edges {
        node {
          id
          note
          tags
        }
      }
    }
  }
`;

export async function createOrUpdateShopifyCustomer(lead: NormalizedLeadPayload): Promise<UpsertCustomerResult> {
  const tags = buildTags(lead);
  const note = buildLeadNote(lead);
  const existingCustomer = await findExistingCustomer(lead);

  if (existingCustomer) {
    return updateExistingCustomer(existingCustomer, lead, tags, note);
  }

  const input = {
    firstName: lead.firstName,
    lastName: lead.lastName || undefined,
    email: lead.email || undefined,
    phone: lead.phone || undefined,
    tags,
    note,
  };

  const createResult = await shopifyGraphql<{
    customerCreate: {
      customer?: { id: string } | null;
      userErrors: ShopifyUserError[];
    };
  }>(CREATE_CUSTOMER_MUTATION, { input });

  const createErrors = createResult.customerCreate.userErrors;
  const createdCustomerId = createResult.customerCreate.customer?.id;

  if (createdCustomerId && createErrors.length === 0) {
    return {
      customerId: createdCustomerId,
      action: "created",
      shouldSendWelcome: true,
      alreadyHadWelcomeOffer: false,
    };
  }

  const customerFoundAfterCreateError = await findExistingCustomer(lead);

  if (!customerFoundAfterCreateError) {
    throw new Error(createErrors[0]?.message || "Shopify could not create this customer.");
  }

  return updateExistingCustomer(customerFoundAfterCreateError, lead, tags, note);
}

async function updateExistingCustomer(
  existingCustomer: ShopifyCustomer,
  lead: NormalizedLeadPayload,
  tags: string[],
  note: string,
): Promise<UpsertCustomerResult> {
  const alreadyHadWelcomeOffer = hasTag(existingCustomer.tags, WELCOME_OFFER_TAG);

  const updateResult = await shopifyGraphql<{
    customerUpdate: {
      customer?: { id: string } | null;
      userErrors: ShopifyUserError[];
    };
  }>(UPDATE_CUSTOMER_MUTATION, {
    input: {
      id: existingCustomer.id,
      firstName: lead.firstName,
      lastName: lead.lastName || undefined,
      email: lead.email || undefined,
      phone: lead.phone || undefined,
      tags: mergeTags(existingCustomer.tags || [], tags),
      note: appendNote(existingCustomer.note, note),
    },
  });

  const updateErrors = updateResult.customerUpdate.userErrors;
  const updatedCustomerId = updateResult.customerUpdate.customer?.id;

  if (!updatedCustomerId || updateErrors.length > 0) {
    throw new Error(updateErrors[0]?.message || "Shopify could not update this customer.");
  }

  return {
    customerId: updatedCustomerId,
    action: "updated",
    shouldSendWelcome: !alreadyHadWelcomeOffer,
    alreadyHadWelcomeOffer,
  };
}

function buildTags(lead: NormalizedLeadPayload): string[] {
  const tags = ["market_club", WELCOME_OFFER_TAG, "casa_crobu", "source_custom_landing_page"];
  const submittedLocation = lead.location || lead.market;
  const sourceLocation = prefixedTag("source_location", submittedLocation);
  const marketLocation = prefixedTag("market_location", submittedLocation);
  const sourceChannel = prefixedTag("source_channel", lead.channel || lead.source);
  const campaign = prefixedTag("campaign", lead.campaign);

  if (sourceLocation) {
    tags.push(sourceLocation);
  }

  if (marketLocation) {
    tags.push(marketLocation);
  }

  if (sourceChannel) {
    tags.push(sourceChannel);
  }

  if (campaign) {
    tags.push(campaign);
  }

  if (lead.email && lead.emailOptIn) {
    tags.push("email_opt_in");
  }

  if (lead.phone && lead.smsOptIn) {
    tags.push("sms_opt_in");
  }

  return tags;
}

function buildLeadNote(lead: NormalizedLeadPayload): string {
  return [
    "Casa Crobu Market Club signup",
    `Submitted at: ${lead.submittedAt}`,
    `First name: ${lead.firstName}`,
    lead.lastName ? `Last name: ${lead.lastName}` : null,
    lead.email ? `Email: ${lead.email}` : null,
    lead.phone ? `Phone: ${lead.phone}` : null,
    lead.location || lead.market ? `Source location: ${lead.location || lead.market}` : null,
    lead.channel || lead.source ? `Source channel: ${lead.channel || lead.source}` : null,
    lead.campaign ? `Campaign: ${lead.campaign}` : null,
    lead.message ? `Message: ${lead.message}` : null,
    `SMS opt-in: ${lead.smsOptIn ? "yes" : "no"}`,
    `Email opt-in: ${lead.emailOptIn ? "yes" : "no"}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function appendNote(existingNote: string | null | undefined, note: string): string {
  return existingNote ? `${existingNote}\n\n---\n${note}` : note;
}

function mergeTags(existingTags: string[], newTags: string[]): string[] {
  return Array.from(new Set([...existingTags, ...newTags]));
}

async function findExistingCustomer(lead: NormalizedLeadPayload): Promise<ShopifyCustomer | null> {
  const emailCustomer = lead.email ? await findCustomer(`email:${escapeSearchValue(lead.email)}`) : null;

  if (emailCustomer) {
    return emailCustomer;
  }

  return lead.phone ? findCustomer(`phone:${escapeSearchValue(lead.phone)}`) : null;
}

async function findCustomer(query: string): Promise<ShopifyCustomer | null> {
  const result = await shopifyGraphql<{
    customers: {
      edges: Array<{ node: ShopifyCustomer }>;
    };
  }>(FIND_CUSTOMER_QUERY, { query });

  return result.customers.edges[0]?.node || null;
}

function hasTag(tags: string[] | null | undefined, tag: string): boolean {
  return Boolean(tags?.some((existingTag) => existingTag.toLowerCase() === tag.toLowerCase()));
}

function escapeSearchValue(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

async function shopifyGraphql<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const shopDomain = process.env.SHOPIFY_SHOP_DOMAIN;
  const accessToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

  if (!shopDomain || !accessToken) {
    throw new Error("Shopify environment variables are not configured.");
  }

  const response = await fetch(`https://${shopDomain}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  const body = (await response.json()) as ShopifyResponse<T>;

  if (!response.ok || body.errors?.length) {
    throw new Error(body.errors?.[0]?.message || `Shopify request failed with ${response.status}.`);
  }

  if (!body.data) {
    throw new Error("Shopify returned an empty response.");
  }

  return body.data;
}
