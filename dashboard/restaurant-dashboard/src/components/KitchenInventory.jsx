import { useState } from 'react';

const KitchenInventory = ({ state, setState }) => {
  const [newItem, setNewItem] = useState({ name: '', quantity: 0 });
  const [editingItem, setEditingItem] = useState(null);
  const [editQuantity, setEditQuantity] = useState('');

  // Safely get inventory from state
  const inventory = state.inventory || {};

  const updateInventory = (itemName, amount) => {
    setState(prev => ({
      ...prev,
      inventory: {
        ...(prev.inventory || {}), // Handle undefined inventory
        [itemName]: Math.max(0, (prev.inventory?.[itemName] || 0) + amount)
      }
    }));
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.name && !inventory[newItem.name.toLowerCase()]) {
      setState(prev => ({
        ...prev,
        inventory: {
          ...(prev.inventory || {}),
          [newItem.name.toLowerCase()]: Math.max(0, newItem.quantity)
        }
      }));
      setNewItem({ name: '', quantity: 0 });
    }
  };

  const startEdit = (itemName) => {
    setEditingItem(itemName);
    setEditQuantity(inventory[itemName]);
  };

  const saveEdit = () => {
    if (editingItem) {
      setState(prev => ({
        ...prev,
        inventory: {
          ...(prev.inventory || {}),
          [editingItem]: Math.max(0, parseInt(editQuantity) || 0)
        }
      }));
      setEditingItem(null);
      setEditQuantity('');
    }
  };

  return (
    <div className="kitchen-inventory">
      <h2>Kitchen Inventory Management</h2>
      
      {/* Add New Item Form */}
      <form onSubmit={handleAddItem} className="inventory-form">
        <input
          type="text"
          placeholder="New Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="form-input"
          required
        />
        <input
          type="number"
          placeholder="Initial Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 0 })}
          className="form-input"
          min="0"
          required
        />
        <button 
          type="submit" 
          className="button success"
          disabled={!newItem.name.trim()}
        >
          Add New Item
        </button>
      </form>

      {/* Current Inventory */}
      <div className="inventory-grid">
        {Object.entries(inventory).map(([item, quantity]) => (
          <div key={item} className="inventory-card">
            <div className="card-header">
              <h3>{item.charAt(0).toUpperCase() + item.slice(1)}</h3>
              {editingItem === item ? (
                <input
                  type="number"
                  value={editQuantity}
                  onChange={(e) => setEditQuantity(e.target.value)}
                  className="quantity-input"
                  min="0"
                />
              ) : (
                <span className="quantity">{quantity}</span>
              )}
            </div>
            
            <div className="card-actions">
              {editingItem === item ? (
                <>
                  <button 
                    className="button success"
                    onClick={saveEdit}
                  >
                    Save
                  </button>
                  <button 
                    className="button"
                    onClick={() => setEditingItem(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="button"
                    onClick={() => updateInventory(item, 1)}
                  >
                    +
                  </button>
                  <button
                    className="button danger"
                    onClick={() => updateInventory(item, -1)}
                    disabled={quantity <= 0}
                  >
                    -
                  </button>
                  <button
                    className="button edit-button"
                    onClick={() => startEdit(item)}
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KitchenInventory;