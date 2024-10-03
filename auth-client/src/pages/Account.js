// src/pages/Account.js
import { useState, useEffect } from "react";
import { getAccount, logout } from "../api/auth";
import { useNavigate } from "react-router-dom";

function AccountPage() {
  const [currentUsername, setCurrentUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch account details on component mount
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const account = await getAccount();
        setCurrentUsername(account.username);
      } catch (err) {
        setError("Failed to load account details.");
      }
    };
    fetchAccount();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logout success");
      navigate("/");
    } catch (err) {
      setError("Logout failed. Try again later.");
    }
  };

  const goToHorses = () => {
    navigate("/horses"); // Navigate to the Horses page
  };

  return (
    <div>
      <h1>Account</h1>
      <p>Username: {currentUsername}</p>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={goToHorses}>View Horses</button> {/* New button */}
      {error && <p>{error}</p>}
    </div>
  );
}

export default AccountPage;
