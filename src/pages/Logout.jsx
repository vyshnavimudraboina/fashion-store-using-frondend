
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");

    // Update Navbar login status
    window.dispatchEvent(new Event("authChange"));

    alert("Logout Successful!");

    navigate("/login");
  }, [navigate]);

  return null;
}

export default Logout;
