import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const existingUser = users.find(
      (u) => u.email.toLowerCase() === user.email.toLowerCase()
    );

    if (existingUser) {
      alert("Email already registered! Please log in.");
      navigate("/login");
      return;
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful! Please log in with your credentials.");
    navigate("/login");
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-icon">✨</span>
          <h1>Join Fashion Store</h1>
          <p>Create an account to track deliveries, earn style rewards, and enjoy faster checkout.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Sarah Jenkins"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="e.g. sarah@example.com"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-input-group">
            <label>Create Password</label>
            <input
              type="password"
              name="password"
              placeholder="At least 6 characters"
              value={user.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>

          <button type="submit" className="submit-btn auth-btn">
            Create Account
          </button>
        </form>

        <div className="auth-footer-prompt">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
