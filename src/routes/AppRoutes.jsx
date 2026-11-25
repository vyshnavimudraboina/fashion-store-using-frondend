
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
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";
import Orders from "../pages/Orders";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/products" element={<Products />} />

      <Route path="/products/:id" element={<ProductDetails />} />

      <Route path="/cart" element={<Cart />} />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      <Route
        path="/order-success/:orderId"
        element={
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />


      <Route path="/register" element={<Register />} />

      <Route path="/logout" element={<Logout />} />

      <Route path="/wishlist" element={<Wishlist />} />

      <Route
        path="/add-product"
        element={
          <ProtectedRoute adminOnly={true}>
            <AddProduct />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-product/:id"
        element={
          <ProtectedRoute adminOnly={true}>
            <EditProduct />
          </ProtectedRoute>
        }
      />
    </Routes>

  );
}


export default AppRoutes;
