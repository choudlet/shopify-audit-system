import pandas as pd
import sys
import os

# Add src to path
sys.path.append(os.path.join(os.getcwd(), 'src'))

from metrics import to_order_level

def hybrid_hook_audit():
    df = pd.read_csv('data/processed/orders_cleaned.csv', low_memory=False)
    df['Created at'] = pd.to_datetime(df['Created at'])
    orders = to_order_level(df)
    known_orders = orders[orders['Email'].notna()].copy()
    
    # 1. Identify Hybrid Customers
    customer_sources = known_orders.groupby('Email')['Source'].unique()
    hybrids = [email for email, sources in customer_sources.items() if 'pos' in set(sources) and 'web' in set(sources)]
    
    # 2. What was their first POS order before a later web order?
    pos_dates = known_orders[known_orders['Source'] == 'pos'].groupby('Email')['Created at'].min()
    web_dates = known_orders[known_orders['Source'] == 'web'].groupby('Email')['Created at'].min()
    hybrid_dates = pd.DataFrame({'first_pos': pos_dates, 'first_web': web_dates}).dropna()
    pos_to_web = hybrid_dates[hybrid_dates['first_pos'] < hybrid_dates['first_web']]
    first_pos_orders = (
        known_orders[known_orders['Email'].isin(pos_to_web.index) & (known_orders['Source'] == 'pos')]
        .sort_values(['Email', 'Created at'])
        .groupby('Email')['Name']
        .first()
    )
    first_order_lines = df[df['Name'].isin(first_pos_orders.values)].copy()
    first_order_lines = first_order_lines[
        first_order_lines['Lineitem name'].notna()
        & (first_order_lines['Lineitem name'].str.lower() != 'tip')
    ]
    
    print("\n--- The Hybrid 'Hook' Audit ---")
    print("What products turned a market fan into a digital subscriber?")
    print(first_order_lines['Lineitem name'].value_counts().head(5))

    print("\n--- The Hybrid Timing Audit ---")
    print("How long does it take captured market fans to buy online?")
    days_to_web = (pos_to_web['first_web'] - pos_to_web['first_pos']).dt.days
    print(days_to_web.describe(percentiles=[.25, .5, .75, .9]).round(1))
    
    # 3. Market Performance Audit
    # Email capture per location, order-level to avoid line-item weighting.
    pos_orders = orders[orders['Source'] == 'pos'].copy()
    pos_orders['has_email'] = pos_orders['Email'].notna()
    location_stats = pos_orders.groupby('Location').agg({
        'Name': 'nunique',
        'Total': ['sum', 'mean'],
        'has_email': lambda x: x.mean() * 100
    })
    location_stats.columns = ['Total Orders', 'Revenue', 'AOV', 'Email Capture %']
    
    print("\n--- Market Power Rankings ---")
    print("Which markets capture the most data?")
    print(location_stats.sort_values('Email Capture %', ascending=False).head(10).round(2))
    
    # 4. Basket Affinity (What do people buy together?)
    # Simple co-occurrence for POS orders
    pos_lines = df[(df['Source'] == 'pos') & df['Lineitem name'].notna()].copy()
    pos_lines = pos_lines[pos_lines['Lineitem name'].str.lower() != 'tip']
    basket = pos_lines.groupby('Name')['Lineitem name'].apply(lambda x: sorted(set(x)))
    
    from collections import Counter
    from itertools import combinations
    
    pairs = Counter()
    for items in basket:
        if len(items) > 1:
            pairs.update(combinations(sorted(items), 2))
            
    print("\n--- Basket Affinity (Top Bundles) ---")
    print("What products are people already buying together at the market?")
    for pair, count in pairs.most_common(5):
        print(f" - {pair[0]} + {pair[1]}: {count} orders")

if __name__ == "__main__":
    hybrid_hook_audit()
