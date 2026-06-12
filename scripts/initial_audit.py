import pandas as pd
import glob
import os
import sys

# Add src to path
sys.path.append(os.path.join(os.getcwd(), 'src'))

from cleaners import clean_shopify_export, identify_ghosts
from metrics import calculate_ghost_rate, find_gateways

def run_audit():
    # Load and combine all Shopify exports
    raw_files = glob.glob('data/raw/orders/*.csv')
    if not raw_files:
        print("No CSV files found in data/raw/orders/")
        return
        
    dfs = []
    for file in raw_files:
        print(f"Loading {file}...")
        df = pd.read_csv(file, low_memory=False)
        dfs.append(df)
        
    combined_df = pd.concat(dfs, ignore_index=True)
    
    # Run the "Forward-Fill" engine
    print("Cleaning and forward-filling data...")
    cleaned_df = clean_shopify_export(combined_df)
    
    # Identify Ghosts
    cleaned_df = identify_ghosts(cleaned_df)
    cleaned_df['Year'] = cleaned_df['Created at'].dt.year
    
    # 1. The Ghost Audit
    ghost_metrics = calculate_ghost_rate(cleaned_df)
    print("\n--- The Ghost Audit ---")
    print(f"Total Orders: {ghost_metrics['total_orders']}")
    print(f"Anonymous Orders: {ghost_metrics['anonymous_orders']} ({ghost_metrics['anonymous_rate']:.2%} of all orders)")
    print(f"Market Shadows (Anonymous POS): {ghost_metrics['shadow_orders']} ({ghost_metrics['shadow_rate']:.2%} of POS orders)")
    
    print(f"\nTotal Known Customers (with Email): {ghost_metrics['total_customers']}")
    print("\nCustomer Breakdown:")
    for cat, count in ghost_metrics['categories'].items():
        print(f" - {cat}: {count} ({count/ghost_metrics['total_customers']:.2%})")
    
    # 3. Seasonal Revenue Audit
    from metrics import analyze_seasonal_revenue
    seasonal_stats = analyze_seasonal_revenue(cleaned_df)
    print("\n--- The Seasonal Revenue Audit ---")
    print("Revenue by Year and Season (Market Season = May-Oct):")
    
    # We'll display Year, Season (Market vs Off), and POS vs Web revenue
    print(seasonal_stats)
    
    # Calculate the Drop-Off for the most recent complete year if possible
    latest_year = cleaned_df['Year'].max()
    if latest_year in seasonal_stats.index.get_level_values('Year'):
        stats_year = seasonal_stats.loc[latest_year]
        if True in stats_year.index and False in stats_year.index:
            market_pos = stats_year.loc[True, 'pos']
            off_web = stats_year.loc[False, 'web']
            off_pos = stats_year.loc[False, 'pos']
            
            print(f"\nAudit for Year {latest_year}:")
            print(f" - Market Season POS Revenue (May-Oct): ${market_pos:,.2f}")
            print(f" - Off-Season Web Revenue (Nov-Apr): ${off_web:,.2f}")
            print(f" - Off-Season POS Revenue (Nov-Apr): ${off_pos:,.2f}")
            
            total_off = off_web + off_pos
            drop_pct = (1 - (total_off / market_pos)) if market_pos > 0 else 0
            print(f" - The Revenue Gap: {drop_pct:.1%} drop-off from Market Season POS to Off-Season Total.")
    
    # 4. LTV Audit by Segment
    from metrics import analyze_ltv_by_segment
    ltv_stats = analyze_ltv_by_segment(cleaned_df)
    print("\n--- The LTV Audit (by Segment) ---")
    print("Comparing Value of Market vs Digital Customers:")
    print(ltv_stats[['LTV', 'Order_Count', 'Segment']])

if __name__ == "__main__":
    run_audit()
