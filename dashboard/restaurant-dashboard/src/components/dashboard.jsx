import { useState } from 'react';
import Table from './Table';

const Dashboard = ({ state, setState }) => {
  const [compactView, setCompactView] = useState(true);

  const handleAddOrder = (tableId, item) => {
    const updatedTables = state.tables.map(table => 
      table.id === tableId ? {
        ...table,
        orders: [...table.orders, item],
        bill: table.bill + item.price,
        status: 'occupied',
        startTime: table.startTime || new Date().toISOString()
      } : table
    );
    setState({ ...state, tables: updatedTables });
  };

  return (
    <div className="container">
      <div className="dashboard-header">
        <h2>Table Overview</h2>
        <button 
          className={`button ${compactView ? 'active' : ''}`}
          onClick={() => setCompactView(!compactView)}
        >
          {compactView ? 'Normal View' : 'Compact View'}
        </button>
      </div>

      <div className={`dashboard-grid ${compactView ? 'compact-view' : ''}`}>
        {state.tables.map(table => (
          <Table
            key={table.id}
            table={table}
            menu={state.menu}
            onAddOrder={handleAddOrder}
            setState={setState}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;