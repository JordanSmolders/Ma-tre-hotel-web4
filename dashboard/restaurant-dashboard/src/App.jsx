import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { initialData } from "./data";
import Dashboard from "./components/dashboard";
import EatingContest from "./components/EatingContest";
import CalendarView from "./components/CalendarView";
import KitchenInventory from "./components/KitchenInventory";
import Vouchers from "./components/Vouchers";
import BirthdayAlert from './components/BirthdayAlert';

function App() {
  const [state, setState] = useState(initialData);

  return (
    <Router>
        <nav className="navbar">
  <div className="nav-container">
    <div className="nav-brand">
      <span className="logo">🍽️</span>
      <h1>Restaurant Dashboard</h1>
    </div>
    <div className="nav-links">
      <Link to="/" className="nav-link">Dashboard</Link>
      <Link to="/contest" className="nav-link">Contest</Link>
      <Link to="/kitchen" className="nav-link">Kitchen</Link>
      <Link to="/vouchers" className="nav-link">Vouchers</Link>
    </div>
  </div>
</nav>

      <div className="container mt-4">
      <BirthdayAlert reservations={state.reservations} />
        <Routes>
          <Route
            path="/"
            element={<Dashboard state={state} setState={setState} />}
          />
          <Route
            path="/contest"
            element={<EatingContest state={state} setState={setState} />}
          />
          <Route
            path="/calendar"
            element={<CalendarView state={state} setState={setState} />}
          />
          <Route
            path="/vouchers"
            element={<Vouchers state={state} setState={setState} />}
          />
          <Route
            path="/kitchen"
            element={<KitchenInventory state={state} setState={setState} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
