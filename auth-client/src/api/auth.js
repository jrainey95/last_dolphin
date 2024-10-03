import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // Ensure this points to your backend server
  withCredentials: true, // Important for handling cookies and sessions
});

// Login user
export const login = async (username, password) => {
  try {
    const response = await API.post("/login", {
      uname: username,
      pw: password,
    });
    return response.data; // Handle success data if needed
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Register new user
export const register = async (username, password, phoneNumber) => {
  try {
    const response = await API.post("/register", {
      uname: username,
      pw: password,
      phoneNumber, // Include the phone number here
    });
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};


// Logout user
// Logout user
export const logout = async () => {
  try {
    const response = await API.post(
      "/logout",
      {},
      {
        // Use POST and empty body
        withCredentials: true,
      }
    );
    return response.data; // This should give you the logout message
  } catch (error) {
    console.error("Error during logout:", error);
    throw new Error("Logout failed"); // Handle error
  }
};

// Get account details
export const getAccount = async () => {
  try {
    const response = await API.get("/account"); // Ensure this matches your backend API endpoint
    return response.data; // Return the account data
  } catch (error) {
    console.error("Error fetching account:", error);
    throw error;
  }
};

export const saveHorse = async (horseData) => {
  try {
    const response = await API.post(
      "/saveHorse",
      { horseData },
      {
        withCredentials: true,
      }
    );
    return response.data; // Handle success message if needed
  } catch (error) {
    console.error("Error saving horse:", error);
    throw error;
  }
};
export const notifyUser = async (horse, phoneNumber) => {
  try {
    const response = await API.post("/notify", {
      horseName: horse.name,
      userPhoneNumber: phoneNumber, // Make sure this is a valid phone number
    });
    alert("Notification set up successfully!");
    return response.data;
  } catch (error) {
    console.error("Error setting up notification:", error);
    alert("Failed to set up notification. Please try again.");
  }
};

