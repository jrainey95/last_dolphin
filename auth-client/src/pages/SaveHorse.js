import React from "react";
import { saveHorse } from "./api"; // Adjust the import based on your file structure

const SaveHorseComponent = () => {
  const handleSaveHorse = async () => {
    const horseData = {
      Age: 2,
      Gender: "Filly",
      Sire: "Persian King (IRE)",
      Dam: "Pure Zen (IRE)",
      Trainer: "Andre Fabre",
      Country: "France",
    };

    try {
      const response = await saveHorse(horseData);
      console.log("Horse saved successfully:", response);
    } catch (error) {
      console.error("Error saving horse:", error);
    }
  };

  return (
    <div>
      <h2>Save Horse</h2>
      <button onClick={handleSaveHorse}>Save Horse</button>
    </div>
  );
};

export default SaveHorseComponent;
