import React, { useState, useEffect } from "react";
import * as cheerio from "cheerio";
import axios from "axios";
import moment from "moment-timezone";
import { Link } from "react-router-dom";
import "./index.css";

function DolphinOwner() {
  const [horseData, setHorseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(60);
   const [errorMessage, setErrorMessage] = useState("");
    const [isSaving, setIsSaving] = useState(false);
  const racecourseOffsets = {
    "Belmont At The Big A (USA)": -8, // PST
    "Hawkesbury (AUS)": +18, // GMT+11
    "Keeneland (USA)": -8, // PST
    "Kyoto (JPN)": +16, // GMT+9
    "Tokyo (JPN)": +16, // GMT+9
    "Woodbine (CAN)": -8, // PST
    "Indiana Grand (USA)": -8, // PST
    "Leicester (GB)": +8, // GMT+8
    "Southwell (AW) (GB)": +8, // GMT+8
    "Nottingham (GB)": +8, // GMT+8
    "York (GB)": +8, // GMT+8
    "Delaware Park (USA)": -8, // PST
    "Kempton (AW) (GB)": +8, // GMT+8
    "Wolverhampton (AW) (GB)": +8, // GMT+8
    "Lyon Parilly (FR)": +8, // GMT+8
    "Newmarket (GB)": +8, // GMT+8
    "Newcastle (AW) (GB)": +8,
    "Chantilly (FR)": +9, // GMT+8
    "Warwick Farm (AUS)": +18,
    "Chelmsford (AW) (GB)": +8,
    "Goodwood (GB)": +8,
    "Kyneton (AUS)": +18,
    "Kembla Grange (AUS)": +18,
    "Windsor (GB)": +8,
    "Yarmouth (GB)": +8,
    "Caulfield (AUS)": +18,
    "Echuca (AUS)": +18,
    "Ascot (GB)": +8,
    "Randwick (AUS)": +18,
  };

  useEffect(() => {
    const fetchHorseData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/fetchData");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setHorseData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchHorseData();
  }, []);

  const calculatePST = (racecourse, localTime) => {
    const offset = racecourseOffsets[racecourse] || 0;
    const localMoment = moment
      .tz(localTime, "HH:mm", "UTC")
      .subtract(offset, "hours");
    return localMoment.format("hh:mm A");
  };

  const calculateTimeUntilRace = (raceDateTime) => {
    const currentPSTTime = moment.tz("America/Los_Angeles");
    const raceTime = moment(raceDateTime);

    const duration = moment.duration(raceTime.diff(currentPSTTime));
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    return `${hours} hours, ${minutes} minutes, and ${seconds} seconds until the race!`;
  };

 const saveHorse = async (horse) => {
   setIsSaving(true);
   setErrorMessage("");
   try {
     await axios.post(
       "http://localhost:3000/saveHorse",
       { horseData: { ...horse, horseName: horse.name } }, // Ensure horseName is saved
       { withCredentials: true }
     );
     alert("Horse saved successfully!");
   } catch (error) {
     setErrorMessage("Failed to save horse. Please try again.");
   } finally {
     setIsSaving(false);
   }
 };

  const notifyUser = async (horse) => {
    const userPhoneNumber = "1234567890"; // Replace with the actual phone number input
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:3000/notify",
        { horseId: horse.id, userPhoneNumber },
        { withCredentials: true }
      );
      alert("Notification set up successfully!");
    } catch (error) {
      alert("Failed to set up notification. Please try again.");
    } finally {
      setLoading(false);
    }
  };

const renderHorsesForDate = (date) => {
  return (
    <tbody key={date}>
      <tr>
        <th colSpan="10" className="th-colspan">
          {date}
        </th>
      </tr>
      {horseData
        .filter((horse) => horse.raceDay === date)
        .map((horse, index) => {
          const raceDateTime = `${horse.raceDay} ${calculatePST(
            horse.racecourse,
            horse.timeLocal
          )}`;
          const timeUntilRace = calculateTimeUntilRace(raceDateTime);

          return (
            <React.Fragment key={index}>
              <tr className="horse-row">
                <td className="name">
                  <Link to={`/godolphin/${horse.horseName}`}>
                    {horse.horseName}
                  </Link>
                </td>
                <td>{horse.racecourse}</td>
                <td className="trainer-jockey">
                  <span className="trainer">{horse.trainer}</span>
                  <br />
                  <span className="jockey">{horse.jockey}</span>
                </td>
                <td>{horse.timeLocal}</td>
                <td className="race-details">
                  <span className="race-name">{horse.raceName}</span>
                  <br />
                  <span className="race-data">{horse.raceData}</span>
                </td>
                <td>{calculatePST(horse.racecourse, horse.timeLocal)}</td>
                <td>{timeUntilRace}</td>
                <td>{horse.age}</td> {/* Display Age */}
                <td>{horse.gender}</td> {/* Display Gender */}
                <td>{horse.sire}</td> {/* Display Sire */}
                <td>{horse.dam}</td> {/* Display Dam */}
                <td>{horse.country}</td> {/* Display Country */}
                <td>
                  <button onClick={() => notifyUser(horse)} disabled={loading}>
                    {loading ? "Notifying..." : "Notify Me"}
                  </button>
                </td>
                <td>
                  <button onClick={() => saveHorse(horse)} disabled={loading}>
                    {loading ? "Saving..." : "Save Horse"}
                  </button>
                </td>
              </tr>
            </React.Fragment>
          );
        })}
    </tbody>
  );
};


  const uniqueDates = [...new Set(horseData.map((horse) => horse.raceDay))];

  const startCountdown = () => {
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) =>
        prevCountdown <= 0 ? 60 : prevCountdown - 1
      );
    }, 1000);

    return () => clearInterval(countdownInterval);
  };

  useEffect(() => {
    startCountdown();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="DolphinOwner">
      <h1>Dolphin Owner's Horses</h1>
      <div className="time-table">
        <table>
          <thead>
            <tr>
              <th className="name">Horse Name</th>
              <th className="racecourse">Racecourse</th>
              <th className="trainer-jockey">Trainer/Jockey</th>
              <th className="local-time">Local Time</th>
              <th className="race-details">Race Details</th>
              <th className="pst-time">PST Time</th>
              <th className="how-long">How Long</th>
              <th className="notify">Notify</th>
              <th className="save">Save</th>
            </tr>
          </thead>
          {uniqueDates.map(renderHorsesForDate)}
        </table>
      </div>
      <div className="countdown">
        <h2>Next race in {countdown} seconds</h2>
      </div>
    </div>
  );
}

export default DolphinOwner;
