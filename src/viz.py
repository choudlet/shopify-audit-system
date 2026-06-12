import seaborn as sns

def plot_top_gateways(gateway_counts, top_n=10):
    """
    Plots a bar chart of the most common gateway products.
    """
    top_gateways = gateway_counts.head(top_n)
    
    sns.set_theme(style="whitegrid")
    ax = sns.barplot(x=top_gateways.values, y=top_gateways.index, palette="viridis")
    ax.set_title(f"Top {top_n} Gateway Products")
    ax.set_xlabel("Number of First Orders")
    ax.set_ylabel("Product Name")
    
    return ax

def plot_ghost_rate(ghost_metrics):
    """
    Plots a simple pie chart of ghost vs known customers.
    """
    import matplotlib.pyplot as plt
    
    labels = ['Anonymous Orders', 'Known Orders']
    anonymous_orders = ghost_metrics['anonymous_orders']
    sizes = [anonymous_orders, ghost_metrics['total_orders'] - anonymous_orders]
    colors = ['#ff9999','#66b3ff']
    
    fig, ax = plt.subplots()
    ax.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=90, colors=colors)
    ax.axis('equal')  
    ax.set_title("The Ghost Audit: Known vs Unknown Orders")
    
    return fig
