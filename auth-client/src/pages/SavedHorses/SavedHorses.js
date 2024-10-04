import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

const SavedHorses = () => {
  const [savedHorses, setSavedHorses] = useState([]);

  const fetchSavedHorses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/account", {
        withCredentials: true,
      });
      console.log("Saved Horses Response:", response.data);
      setSavedHorses(response.data.savedHorses || []);
    } catch (error) {
      console.error("Error fetching saved horses:", error);
    }
  };

  useEffect(() => {
    fetchSavedHorses();
  }, []);

  return (
    <div className="area__content">
      <h1>Saved Horses</h1>
      <div className="horse-table">
        {savedHorses.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th className="name">Horse Name</th>
                <th className="age">Age</th>
                <th className="gender">Gender</th>
                <th className="sire">Sire</th>
                <th className="dam">Dam</th>
                <th className="trainer">Trainer</th>
                <th className="country">Country</th>
              </tr>
            </thead>
            <tbody>
              {savedHorses.map((horse, index) => (
                <tr key={index}>
                  <td className="name">{horse.horseName || horse.name}</td>{" "}
                  {/* Adjust based on actual field */}
                  <td className="age">{horse.age}</td>
                  <td className="gender">{horse.gender}</td>
                  <td className="sire">{horse.sire}</td>
                  <td className="dam">{horse.dam}</td>
                  <td className="trainer">{horse.trainer}</td>
                  <td className="country">{horse.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No saved horses yet.</p>
        )}
      </div>
    </div>
  );
};


export default SavedHorses;
