import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    // Check if credentials match admin or normal users
    let loggedUser = null;
    let role = "user";

    if (email.toLowerCase() === "admin@fashion.com" && (password === "admin123" || password.length >= 4)) {
      loggedUser = { email: "admin@fashion.com", name: "Store Admin", role: "admin" };
      role = "admin";
    } else if (email.toLowerCase() === "user@fashion.com" && (password === "user123" || password.length >= 4)) {
      loggedUser = { email: "user@fashion.com", name: "Fashion Customer", role: "user" };
      role = "user";
    } else {
      const found = users.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password
      );
      if (found) {
        loggedUser = found;
        role = found.role || (found.email.toLowerCase().includes("admin") ? "admin" : "user");
      }
    }

    if (loggedUser) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", loggedUser.email);
      localStorage.setItem("userName", loggedUser.name || (role === "admin" ? "Store Admin" : "Customer"));
      localStorage.setItem("userRole", role);
      localStorage.setItem("isAdmin", role === "admin" ? "true" : "false");

      // Update Navbar login status
      window.dispatchEvent(new Event("authChange"));

      alert(
        role === "admin"
          ? "Logged in as Administrator (Full access to Add, Edit, Delete products)."
          : "Logged in as Customer (Browse, Cart & Buy products)."
      );

      // Return to destination if came from protected route like /checkout
      const destination = location.state?.from?.pathname || "/products";
      const targetState = location.state?.from?.state;

      navigate(destination, { state: targetState, replace: true });
    } else {
      alert("Invalid Email or Password! You can use the Quick Demo buttons below to log in as Admin or Customer.");
    }
  }

  function handleFillAdmin() {
    setEmail("admin@fashion.com");
    setPassword("admin123");
  }

  function handleFillCustomer() {
    setEmail("user@fashion.com");
    setPassword("user123");
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-icon">✨</span>
          <h1>Welcome Back</h1>
          <p>Log in to access your orders, shopping cart, or manage products.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="e.g. user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn auth-btn">
            Log In
          </button>

          <div className="demo-roles-group">
            <button
              type="button"
              className="demo-account-btn admin-demo"
              onClick={handleFillAdmin}
            >
              👑 Fill Admin (admin@fashion.com)
            </button>

            <button
              type="button"
              className="demo-account-btn customer-demo"
              onClick={handleFillCustomer}
            >
              👤 Fill Customer (user@fashion.com)
            </button>
          </div>
        </form>


        <div className="auth-footer-prompt">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="auth-link">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
