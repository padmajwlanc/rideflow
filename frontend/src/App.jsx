import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./components/layout/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import RequestRide from "./pages/RequestRide";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/request-ride" element={<RequestRide />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;