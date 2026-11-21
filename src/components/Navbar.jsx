
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Navbar() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const wishlist = useSelector(
    (state) => state.wishlist
  );

  useEffect(() => {
    function updateLoginStatus() {
      setIsLoggedIn(
        localStorage.getItem("isLoggedIn") === "true"
      );
    }

    window.addEventListener("storage", updateLoginStatus);
    window.addEventListener("authChange", updateLoginStatus);

    return () => {
      window.removeEventListener("storage", updateLoginStatus);
      window.removeEventListener("authChange", updateLoginStatus);
    };
  }, []);

  return (
    <nav>
      <h2>Fashion Store</h2>

      <Link to="/">Home</Link>

      <Link to="/products">Products</Link>

      {!isLoggedIn && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {isLoggedIn && (
        <Link to="/logout">Logout</Link>
      )}

      <Link to="/wishlist">
        Wishlist ({wishlist.length})
      </Link>

    </nav>
  );
}

export default Navbar;
