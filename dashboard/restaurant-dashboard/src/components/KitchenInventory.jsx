const KitchenInventory = ({ state, setState }) => {
    const updateInventory = (item, amount) => {
      setState(prev => ({
        ...prev,
        inventory: {
          ...prev.inventory,
          [item]: Math.max(0, prev.inventory[item] + amount)
        }
      }));
    };
  
    return (
      <div>
        <h2>Kitchen Inventory</h2>
        <div className="row">
          {Object.entries(state.inventory).map(([item, quantity]) => (
            <div key={item} className="col-md-3 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{item.charAt(0).toUpperCase() + item.slice(1)}</h5>
                  <p className="card-text">Stock: {quantity}</p>
                  <div className="d-flex gap-2">
                    <button 
                      className="btn btn-success"
                      onClick={() => updateInventory(item, 1)}
                    >
                      +
                    </button>
                    <button 
                      className="btn btn-danger"
                      onClick={() => updateInventory(item, -1)}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  export default KitchenInventory;