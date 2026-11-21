
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const loggedUser = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

    if (loggedUser) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);

      // Update Navbar login status
      window.dispatchEvent(new Event("authChange"));

      alert("Login Successful!");

      navigate("/products");
    } else {
      alert("Invalid Email or Password!");
    }
  }

  return (
    <div className="form-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="submit-btn">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
