import Table from './Table';

const Dashboard = ({ state, setState }) => {
  const handleAddOrder = (tableId, item) => {
    const updatedTables = state.tables.map(table => {
      if (table.id === tableId) {
        return {
          ...table,
          orders: [...table.orders, item],
          bill: table.bill + item.price
        };
      }
      return table;
    });
    setState({ ...state, tables: updatedTables });
  };

  return (
    <div className="dashboard">
      <h2 className="section-title">Tables Overview</h2>
      <div className="grid">
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