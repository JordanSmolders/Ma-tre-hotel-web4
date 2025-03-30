import { useState } from 'react';

const Table = ({ table, menu, onAddOrder, setState }) => {
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(table.status);
  const [reservationTime, setReservationTime] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');

  const updateTableStatus = (newStatus) => {
    setState(prev => ({
      ...prev,
      tables: prev.tables.map(t => 
        t.id === table.id ? { 
          ...t, 
          status: newStatus,
          startTime: newStatus === 'occupied' ? new Date().toISOString() : t.startTime,
          reservation: newStatus === 'reserved' ? { time: reservationTime } : null
        } : t
      )
    }));
    setStatus(newStatus);
  };

  const handleReservation = () => {
    if (reservationTime) {
      setState(prev => ({
        ...prev,
        reservations: [...prev.reservations, {
          tableId: table.id,
          time: reservationTime,
          status: 'reserved',
          specialRequest
        }]
      }));
      updateTableStatus('reserved');
    }
  };

  const markAsPaid = () => {
    setState(prev => ({
      ...prev,
      tables: prev.tables.map(t => 
        t.id === table.id ? { 
          ...t, 
          status: 'free', 
          orders: [], 
          bill: 0,
          startTime: null,
          reservation: null
        } : t
      )
    }));
  };

  const calculateOccupancyTime = () => {
    if (!table.startTime) return '0m';
    const minutes = Math.floor((Date.now() - new Date(table.startTime)) / 60000);
    return `${minutes}m`;
  };

  const getStatusColor = () => {
    switch (table.status) {
      case 'occupied': return 'status-occupied';
      case 'reserved': return 'status-reserved';
      default: return 'status-free';
    }
  };

  return (
    <div className="table-card">
      <div className="table-header">
        <div className="table-number">Table {table.id}</div>
        <div className={`table-status status-${table.status}`}>
          {table.status.toUpperCase()}
        </div>
      </div>

      <div className="table-info">
        <div className="info-row">
          <span>Orders:</span>
          <span>{table.orders.length}</span>
        </div>
        <div className="info-row">
          <span>Total:</span>
          <span>${table.bill}</span>
        </div>
        {table.reservation && (
          <div className="info-row">
            <span>Reserved:</span>
            <span>{new Date(table.reservation.time).toLocaleTimeString()}</span>
          </div>
        )}
      </div>

      <button 
        className="button primary"
        onClick={() => setShowModal(true)}
      >
        Manage Orders
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Manage Table {table.id}</h2>
              <button 
                className="close-button"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div className="status-controls">
                <h4>Table Status</h4>
                <select 
                  value={status}
                  onChange={(e) => updateTableStatus(e.target.value)}
                  className="form-input"
                >
                  <option value="free">Free</option>
                  <option value="reserved">Reserved</option>
                  <option value="occupied">Occupied</option>
                </select>

                {status === 'reserved' && (
                  <div className="reservation-form">
                    <label>Reservation Time</label>
                    <input
                      type="datetime-local"
                      value={reservationTime}
                      onChange={(e) => setReservationTime(e.target.value)}
                      className="form-input"
                    />
                    <label>Special Requests</label>
                    <textarea
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      className="form-input"
                      rows="3"
                    />
                    <button 
                      onClick={handleReservation}
                      className="button button-primary"
                    >
                      Confirm Reservation
                    </button>
                  </div>
                )}
              </div>

              <div className="orders-section">
                <h4>Current Orders (${table.bill})</h4>
                {table.orders.length > 0 ? (
                  <div className="orders-list">
                    {table.orders.map((item, i) => (
                      <div key={i} className="order-item">
                        <span className="item-name">{item.name}</span>
                        <span className="item-price">${item.price}</span>
                        {item.allergens?.length > 0 && (
                          <div className="allergy-tags">
                            {item.allergens.map(a => (
                              <span key={a} className="allergy-badge">{a}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-orders">No orders yet</p>
                )}
              </div>

              <div className="menu-section">
                <h4>Add Items to Order</h4>
                <div className="menu-categories">
                  <div className="menu-category">
                    <h5>Main Courses</h5>
                    <div className="menu-items">
                      {menu.main.map(item => (
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

                  <div className="menu-category">
                    <h5>Drinks</h5>
                    <div className="menu-items">
                      {menu.drinks.map(item => (
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
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="button button-success"
                onClick={markAsPaid}
                disabled={table.status !== 'occupied'}
              >
                Mark as Paid
              </button>
              <button 
                className="button"
                onClick={() => setShowModal(false)}
              >
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