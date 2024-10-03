// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import AccountPage from "./pages/Account";
import Home from "./pages/Home";
import Horses from "./pages/Horses";
import SavedHorses from "./pages/SavedHorse";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/horses" element={<Horses />} />
        <Route path="/savedhorses" element={<SavedHorses />} />
        {/* <Route path="/logout" element={<LogoutPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
