import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Navbar() {
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("userEmail") || ""
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || "user"
  );

  const wishlist = useSelector((state) => state.wishlist || []);
  const cart = useSelector((state) => state.cart || []);

  const totalCartItems = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  useEffect(() => {
    function updateLoginStatus() {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
      setUserEmail(localStorage.getItem("userEmail") || "");
      setUserRole(localStorage.getItem("userRole") || "user");
    }

    window.addEventListener("storage", updateLoginStatus);
    window.addEventListener("authChange", updateLoginStatus);

    return () => {
      window.removeEventListener("storage", updateLoginStatus);
      window.removeEventListener("authChange", updateLoginStatus);
    };
  }, []);

  const isActive = (path) => location.pathname === path;
  const isAdmin = isLoggedIn && userRole === "admin";

  return (
    <header className="main-navbar-header">
      <div className="nav-inner-container">
        {/* Brand Logo */}
        <Link to="/" className="nav-brand-logo">
          <span className="brand-icon">✨</span>
          <div className="brand-text">
            <span className="brand-main">FASHION</span>
            <span className="brand-sub">STORE</span>
          </div>
        </Link>

        {/* Primary Navigation Links */}
        <nav className="nav-links-menu">
          <Link
            to="/"
            className={`nav-link-item ${isActive("/") ? "active" : ""}`}
          >
            Home
          </Link>

          <Link
            to="/products"
            className={`nav-link-item ${isActive("/products") ? "active" : ""}`}
          >
            Explore Collection
          </Link>

          <Link
            to="/wishlist"
            className={`nav-link-item ${isActive("/wishlist") ? "active" : ""}`}
          >
            Wishlist
            {wishlist.length > 0 && (
              <span className="nav-counter-badge">{wishlist.length}</span>
            )}
          </Link>

          <Link
            to="/orders"
            className={`nav-link-item ${isActive("/orders") ? "active" : ""}`}
          >
            My Orders
          </Link>

          {/* Admin only action in Navbar */}
          {isAdmin && (
            <Link
              to="/add-product"
              className={`nav-link-item nav-admin-link ${isActive("/add-product") ? "active" : ""}`}
            >
              ➕ Add Product
            </Link>
          )}
        </nav>

        {/* Right Actions: Cart & Auth */}
        <div className="nav-right-actions">
          <Link
            to="/cart"
            className={`nav-cart-pill ${isActive("/cart") ? "active" : ""}`}
          >
            <span className="cart-icon">🛒</span>
            <span className="cart-text">Cart</span>
            <span className="cart-count-bubble">{totalCartItems}</span>
          </Link>

          {!isLoggedIn ? (
            <div className="nav-auth-buttons">
              <Link to="/login" className="nav-login-btn">
                Log In
              </Link>
              <Link to="/register" className="nav-register-btn">
                Register
              </Link>
            </div>
          ) : (
            <div className="nav-user-profile-menu">
              <span
                className={`user-email-badge ${isAdmin ? "admin-profile" : ""}`}
                title={userEmail}
              >
                {isAdmin ? "👑 Admin" : `👤 ${userEmail ? userEmail.split("@")[0] : "Customer"}`}
              </span>
              <Link to="/logout" className="nav-logout-btn">
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
