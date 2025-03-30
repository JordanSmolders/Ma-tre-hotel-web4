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
        <div className="container">
          <Link to="/">🌟 Michelin Dashboard</Link>
          <div className="nav-links">
            <Link to="/">Tables</Link>
            <Link to="/contest">Steak Contest</Link>
            <Link to="/calendar">Calendar</Link>
            <Link to="/vouchers">Vouchers</Link>
            <Link to="/kitchen">Kitchen</Link>
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
