
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("isAdmin");

    // Update Navbar login status
    window.dispatchEvent(new Event("authChange"));

    // Show success notification
    toast.success("Logout Successful!");

    // Navigate to Login page
    navigate("/login");
  }, [navigate]);

  return null;
}

export default Logout;
