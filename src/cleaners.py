import pandas as pd
import numpy as np

def clean_shopify_export(df):
    """
    Cleans a Shopify order export DataFrame.
    
    Shopify exports are de-normalized: order-level info (Name, Email, Total, etc.)
    is only in the first row of an order. Subsequent line items have these blank.
    
    This function:
    1. Forward-fills order-level columns.
    2. Converts date columns to datetime objects.
    3. Handles missing values for 'Ghost' identification.
    """
    
    # Columns that should be forward-filled (order-level data)
    # We identify them by checking which columns are NOT line-item specific
    order_cols = [
        'Name', 'Email', 'Financial Status', 'Paid at', 'Fulfillment Status',
        'Fulfilled at', 'Accepts Marketing', 'Currency', 'Subtotal', 'Shipping',
        'Taxes', 'Total', 'Discount Code', 'Discount Amount', 'Shipping Method',
        'Created at', 'Billing Name', 'Billing Street', 'Billing Address1',
        'Billing Address2', 'Billing City', 'Billing Zip', 'Billing Province',
        'Billing Country', 'Billing Phone', 'Shipping Name', 'Shipping Street',
        'Shipping Address1', 'Shipping Address2', 'Shipping City', 'Shipping Zip',
        'Shipping Province', 'Shipping Country', 'Shipping Phone', 'Notes',
        'Note Attributes', 'Cancelled at', 'Payment Method', 'Payment Reference',
        'Refunded Amount', 'Vendor', 'Outstanding Balance', 'Employee',
        'Location', 'Device ID', 'Id', 'Tags', 'Risk Level', 'Source'
    ]
    
    # Ensure columns exist before ffilling
    cols_to_ffill = [c for c in order_cols if c in df.columns]
    
    # Shopify exports use empty strings for blank values in some environments,
    # or NaN in others. Let's ensure NaN for ffill.
    df[cols_to_ffill] = df[cols_to_ffill].replace('', np.nan)
    
    # CRITICAL FIX: Only forward-fill within the same Order (Name).
    # This prevents an email from Order #1001 bleeding into an anonymous Order #1002.
    df[cols_to_ffill] = df.groupby('Name')[cols_to_ffill].ffill()
    
    # Convert dates
    date_cols = ['Created at', 'Paid at', 'Fulfilled at', 'Cancelled at']
    for col in date_cols:
        if col in df.columns:
            df[col] = pd.to_datetime(df[col], errors='coerce', utc=True)
            
    # Normalize currency/numeric columns
    numeric_cols = ['Subtotal', 'Shipping', 'Taxes', 'Total', 'Lineitem price', 'Lineitem quantity', 'Discount Amount']
    for col in numeric_cols:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0)
            
    return df

def identify_ghosts(df):
    """
    Identifies 'Ghost' orders (those without an email).
    """
    df['is_ghost'] = df['Email'].isna() | (df['Email'] == '')
    return df
