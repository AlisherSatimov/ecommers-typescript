import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import "./App.css";

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/*" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
