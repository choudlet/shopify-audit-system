import pandas as pd


def to_order_level(df):
    """
    Collapse Shopify's line-item export into one row per order.

    Shopify repeats/forward-fills order totals across line items after cleaning,
    so customer revenue metrics must use this shape to avoid double counting.
    """
    sort_cols = [c for c in ['Name', 'Created at'] if c in df.columns]
    if sort_cols:
        df = df.sort_values(sort_cols)
    return df.groupby('Name', as_index=False).first()


def categorize_sources(sources):
    sources = set(sources)
    if 'pos' in sources and 'web' in sources:
        return 'Hybrid (The Bridge)'
    if 'pos' in sources:
        return 'Ghost (POS-Only)'
    if 'web' in sources:
        return 'Digital Native (Web-Only)'
    return 'Other'


def calculate_ghost_rate(df):
    """
    Calculates the Ghost Rate:
    - 'Market Shadows': Anonymous POS orders (No Email captured).
    - 'Ghost (POS-Only)': Email captured at POS, but never bought on Web.
    - 'Hybrid (The Bridge)': Bought at POS AND Web.
    - 'Digital Native (Web-Only)': Bought on Web, never at POS.
    """
    # 1. Separate out anonymous orders and POS-specific "Market Shadows".
    # These are orders, not customers.
    orders = to_order_level(df)
    anonymous_count = orders['Email'].isna().sum()
    pos_orders = orders[orders['Source'] == 'pos']
    shadow_count = pos_orders['Email'].isna().sum()
    total_orders = len(orders)
    total_pos_orders = len(pos_orders)
    
    # 2. Categorize customers with emails
    df_with_email = orders[orders['Email'].notna()].copy()
    customer_sources = df_with_email.groupby('Email')['Source'].unique()
    customer_categories = customer_sources.apply(categorize_sources).value_counts()
    
    return {
        'total_orders': total_orders,
        'anonymous_orders': anonymous_count,
        'anonymous_rate': (anonymous_count / total_orders) if total_orders > 0 else 0,
        'total_pos_orders': total_pos_orders,
        'shadow_orders': shadow_count,
        'shadow_rate': (shadow_count / total_pos_orders) if total_pos_orders > 0 else 0,
        'total_customers': len(customer_sources),
        'categories': customer_categories.to_dict()
    }

def analyze_seasonal_revenue(df):
    """
    Analyzes revenue shift between Market Season (May-Oct) and Off-Season.
    """
    order_revenue = to_order_level(df).copy()
    order_revenue['Month'] = order_revenue['Created at'].dt.month
    order_revenue['Year'] = order_revenue['Created at'].dt.year
    
    # Define Season
    # Market Season: May (5) through October (10)
    order_revenue['is_market_season'] = order_revenue['Month'].between(5, 10)
    
    seasonal_stats = order_revenue.groupby(['Year', 'is_market_season', 'Source'])['Total'].sum().unstack(fill_value=0)
    
    return seasonal_stats

def analyze_ltv_by_segment(df):
    """
    Compares LTV and Frequency across customer segments.
    Only works for known customers (with Email).
    """
    # 1. Categorize customers using one row per order.
    # The cleaned export has order totals forward-filled onto line-item rows.
    orders = to_order_level(df)
    df_with_email = orders[orders['Email'].notna()].copy()
    customer_data = df_with_email.groupby('Email').agg({
        'Source': lambda x: set(x),
        'Total': 'sum',
        'Name': 'nunique'
    }).rename(columns={'Total': 'LTV', 'Name': 'Order_Count'})

    customer_data['Segment'] = customer_data['Source'].apply(categorize_sources)
    
    # 2. Calculate Averages per Segment
    ltv_stats = customer_data.groupby('Segment').agg({
        'LTV': ['mean', 'median', 'sum'],
        'Order_Count': ['mean', 'max'],
        'Segment': 'count'
    })
    
    return ltv_stats

def find_gateways(df):
    """
    Identifies 'Gateway Products'—the first item a customer ever buys.
    Exclude 'ghost' customers for this since we can't track them over time.
    """
    # Filter for non-ghost customers
    real_customers = df[~df['Email'].isna() & (df['Email'] != '')].copy()
    
    # Sort by date to find first orders
    real_customers = real_customers.sort_values(['Email', 'Created at'])
    
    # Get the first order for each customer
    first_orders = real_customers.groupby('Email').first().reset_index()
    
    # The 'Lineitem name' in the first order is the gateway
    gateway_counts = first_orders['Lineitem name'].value_counts()
    
    return gateway_counts

def basket_affinity(df):
    """
    Finds which products are most commonly bought together in the same order.
    """
    # This is a bit more complex, we'll start with simple co-occurrence
    # Implementation can be expanded in the exploration phase
    pass
