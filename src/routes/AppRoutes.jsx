
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Logout from "../pages/Logout";
import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";
import Wishlist from "../pages/Wishlist";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/products" element={<Products />} />

      <Route path="/products/:id" element={<ProductDetails />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/logout" element={<Logout />} />

      <Route path="/wishlist" element={<Wishlist />} />

      <Route
        path="/add-product"
        element={
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-product/:id"
        element={<EditProduct />}
      />
    </Routes>
  );
}

export default AppRoutes;
