import { Routes, Route } from "react-router-dom";
import Attributes from "./pages/Attributes";
import Dashboard from "./pages/Dashboard";
import Layout from "./layout/adminLayout";
import AddAdmin from "./pages/AddAdmin";
import Category from "./pages/Category";
import Products from "./pages/Products";
import Brands from "./pages/Brands";
import Events from "./pages/Events";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Pages from "./pages/Pages";
import Users from "./pages/Users";

function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/admin/attributes" element={<Attributes />} />
        <Route path="/admin/addadmin" element={<AddAdmin />} />
        <Route path="/admin/brands" element={<Brands />} />
        <Route path="/admin/category" element={<Category />} />
        <Route path="/admin/events" element={<Events />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/pages" element={<Pages />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/users" element={<Users />} />
      </Route>
      <Route path="*" element={<div>NOT FOUND</div>} />
    </Routes>
  );
}

export default App;
