import "./App.css";
import Customers from "./components/customers/Customers";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Transection from "./components/transection/Transection";
import "react-toastify/dist/ReactToastify.css";
import Help from "./components/Help/Help";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/customers"
          element={
            <ProtectRoute>
              <Customers />
            </ProtectRoute>
          }
        />
        <Route path="/transection" element={<Transection />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </div>
  );
}

export function ProtectRoute(props) {
  if (localStorage.getItem("user")) {
    return props.children;
  } else {
    return <Navigate to="/" />;
  }
}
export default App;
