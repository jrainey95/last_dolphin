import React, { useEffect, useState } from "react";
import axios from "axios";

const SavedHorses = () => {
  const [savedHorses, setSavedHorses] = useState([]);

  const fetchSavedHorses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/account", {
        withCredentials: true, // Ensure session info is sent
      });
      setSavedHorses(response.data.savedHorses || []);
    } catch (error) {
      console.error("Error fetching saved horses:", error);
    }
  };

  useEffect(() => {
    fetchSavedHorses();
  }, []);

  return (
    <div>
      <h1>Saved Horses</h1>
      {savedHorses.length > 0 ? (
        <ul>
          {savedHorses.map((horse, index) => (
            <li key={index}>
              <strong>{horse.name}</strong> - Age: {horse.age}, Gender:{" "}
              {horse.gender}, Sire: {horse.sire}, Dam: {horse.dam}, Trainer:{" "}
              {horse.trainer}, Country: {horse.country}
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved horses yet.</p>
      )}
    </div>
  );
};

export default SavedHorses;
