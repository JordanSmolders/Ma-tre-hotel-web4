import { useState } from 'react';

const Vouchers = ({ state, setState }) => {
  const [newVoucher, setNewVoucher] = useState({ code: '', amount: '', validUntil: '' });

  const createVoucher = () => {
    setState(prev => ({
      ...prev,
      vouchers: [
        ...prev.vouchers,
        {
          id: prev.vouchers.length + 1,
          ...newVoucher,
          used: false,
          validUntil: new Date(newVoucher.validUntil).toISOString()
        }
      ]
    }));
    setNewVoucher({ code: '', amount: '', validUntil: '' });
  };

  const markUsed = (voucherId) => {
    setState(prev => ({
      ...prev,
      vouchers: prev.vouchers.map(v => 
        v.id === voucherId ? { ...v, used: true } : v
      )
    }));
  };

  rreturn (
    <div className="vouchers">
      <h2 className="section-title">Gift Vouchers</h2>
      
      <div className="voucher-form">
        <input
          className="form-input"
          placeholder="Voucher Code"
          value={newVoucher.code}
          onChange={e => setNewVoucher({ ...newVoucher, code: e.target.value })}
        />
        <input
          className="form-input"
          type="number"
          placeholder="Amount"
          value={newVoucher.amount}
          onChange={e => setNewVoucher({ ...newVoucher, amount: e.target.value })}
        />
        <input
          className="form-input"
          type="date"
          value={newVoucher.validUntil}
          onChange={e => setNewVoucher({ ...newVoucher, validUntil: e.target.value })}
        />
        <button className="button" onClick={createVoucher}>
          Create Voucher
        </button>
      </div>

      <div className="vouchers-table">
        <div className="table-header">
          <div>Code</div>
          <div>Amount</div>
          <div>Valid Until</div>
          <div>Status</div>
          <div>Action</div>
        </div>
        
        {state.vouchers.map(voucher => (
          <div className="table-row" key={voucher.id}>
            <div>{voucher.code}</div>
            <div>${voucher.amount}</div>
            <div>{new Date(voucher.validUntil).toLocaleDateString()}</div>
            <div>{voucher.used ? 'Used' : 'Valid'}</div>
            <div>
              {!voucher.used && (
                <button 
                  className="button small"
                  onClick={() => markUsed(voucher.id)}
                >
                  Mark as Used
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Vouchers;