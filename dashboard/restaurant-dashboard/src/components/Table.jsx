import { useState } from 'react';

const Table = ({ table, menu, onAddOrder, setState }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const markAsPaid = () => {
    setState(prev => ({
      ...prev,
      tables: prev.tables.map(t => 
        t.id === table.id ? { 
          ...t, 
          status: 'free', 
          orders: [], 
          bill: 0,
          startTime: null 
        } : t
      )
    }));
  };

  return (
    <div className="card">
      <h3>Table {table.id}</h3>
      <div className="table-status">
        <span className={`status-badge ${table.status}`}>
          {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
        </span>
        {table.status === 'occupied' && (
          <span className="occupancy-time">
            {Math.floor((Date.now() - new Date(table.startTime)) / 60000)} mins
          </span>
        )}
      </div>

      <button 
        className="button"
        onClick={() => setShowModal(true)}
      >
        Manage Orders
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Table {table.id} Management</h2>
              <button 
                className="close-button"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div className="orders-section">
                <h3>Current Orders (Total: ${table.bill})</h3>
                <div className="orders-list">
                  {table.orders.map((item, i) => (
                    <div key={i} className="order-item">
                      <span className="item-name">{item.name}</span>
                      <span className="item-price">${item.price}</span>
                      <div className="allergy-tags">
                        {item.allergens?.map(a => (
                          <span key={a} className="allergy-badge">{a}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="menu-section">
                <h3>Add Items to Order</h3>
                <div className="menu-items-grid">
                  {[...menu.main, ...menu.drinks].map(item => (
                    <button
                      key={item.id}
                      className="menu-item-button"
                      onClick={() => onAddOrder(table.id, item)}
                    >
                      <span className="item-name">{item.name}</span>
                      <span className="item-price">${item.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="button success" onClick={markAsPaid}>
                Mark as Paid
              </button>
              <button className="button" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Table;