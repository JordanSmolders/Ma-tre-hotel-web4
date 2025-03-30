import { useState } from 'react';

const Vouchers = ({ state, setState }) => {
  const [newVoucher, setNewVoucher] = useState({ 
    code: '', 
    amount: '', 
    validUntil: '' 
  });
  const [filter, setFilter] = useState('all');
  const [editVoucher, setEditVoucher] = useState(null);

  const createVoucher = (e) => {
    e.preventDefault();
    if (!newVoucher.code || !newVoucher.amount) return;

    setState(prev => ({
      ...prev,
      vouchers: [
        ...prev.vouchers,
        {
          id: Date.now(),
          code: newVoucher.code.toUpperCase(),
          amount: parseFloat(newVoucher.amount),
          validUntil: new Date(newVoucher.validUntil),
          used: false,
          createdAt: new Date()
        }
      ]
    }));
    setNewVoucher({ code: '', amount: '', validUntil: '' });
  };

  const toggleUsed = (voucherId) => {
    setState(prev => ({
      ...prev,
      vouchers: prev.vouchers.map(v => 
        v.id === voucherId ? { ...v, used: !v.used } : v
      )
    }));
  };

  const deleteVoucher = (voucherId) => {
    setState(prev => ({
      ...prev,
      vouchers: prev.vouchers.filter(v => v.id !== voucherId)
    }));
  };

  const filteredVouchers = state.vouchers.filter(v => {
    const now = new Date();
    if (filter === 'valid') return !v.used && v.validUntil > now;
    if (filter === 'expired') return v.validUntil < now && !v.used;
    if (filter === 'used') return v.used;
    return true;
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isValidNewVoucher = () => {
    return (
      newVoucher.code.trim() &&
      newVoucher.amount > 0 &&
      new Date(newVoucher.validUntil) > new Date()
    );
  };

  return (
    <div className="vouchers-container">
      <h2>Gift Voucher Management</h2>
      
      {/* Create Voucher Form */}
      <form onSubmit={createVoucher} className="voucher-form">
        <div className="form-group">
          <label>Voucher Code:</label>
          <input
            type="text"
            value={newVoucher.code}
            onChange={(e) => setNewVoucher({ ...newVoucher, code: e.target.value })}
            placeholder="e.g., SUMMER25"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Amount ($):</label>
          <input
            type="number"
            min="1"
            step="0.01"
            value={newVoucher.amount}
            onChange={(e) => setNewVoucher({ ...newVoucher, amount: e.target.value })}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Expiration Date:</label>
          <input
            type="date"
            value={newVoucher.validUntil}
            onChange={(e) => setNewVoucher({ ...newVoucher, validUntil: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="button primary"
          disabled={!isValidNewVoucher()}
        >
          Create Voucher
        </button>
      </form>

      {/* Filter Controls */}
      <div className="filter-controls">
        <label>Filter:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Vouchers</option>
          <option value="valid">Valid & Unused</option>
          <option value="used">Used</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      {/* Vouchers Table */}
      <div className="vouchers-table">
        {filteredVouchers.length === 0 ? (
          <p className="no-vouchers">No vouchers found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Amount</th>
                <th>Created</th>
                <th>Expires</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVouchers.map(voucher => (
                <tr key={voucher.id} className={voucher.used ? 'used' : ''}>
                  <td>{voucher.code}</td>
                  <td>${voucher.amount.toFixed(2)}</td>
                  <td>{formatDate(voucher.createdAt)}</td>
                  <td>{formatDate(voucher.validUntil)}</td>
                  <td>
                    <span className={`status ${voucher.used ? 'used' : 
                      new Date(voucher.validUntil) < new Date() ? 'expired' : 'valid'}`}>
                      {voucher.used ? 'Used' : 
                       new Date(voucher.validUntil) < new Date() ? 'Expired' : 'Valid'}
                    </span>
                  </td>
                  <td className="actions">
                    <button
                      onClick={() => toggleUsed(voucher.id)}
                      className={`button small ${voucher.used ? 'secondary' : 'success'}`}
                      disabled={new Date(voucher.validUntil) < new Date()}
                    >
                      {voucher.used ? 'Mark Unused' : 'Mark Used'}
                    </button>
                    <button
                      onClick={() => deleteVoucher(voucher.id)}
                      className="button small danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Vouchers;