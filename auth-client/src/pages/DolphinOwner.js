// import React, { useState, useEffect } from "react";
// import { load } from "cheerio";
// // import moment from "moment-timezone";
// import { Link } from "react-router-dom";

// function DolphinOwner() {
//   const [horseData, setHorseData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchHorseData = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/api/fetchData");
//         if (!response.ok) throw new Error("Network response was not ok");

//         // Ensure the response is parsed as JSON
//         const data = await response.json();

//         console.log("Horse Data:", data); // Check the response data
//         return data;
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchHorseData();
//   }, []);

//   const extractHorseData = (html) => {
//     const $$ = load(html);
//     const horseData = [];

//     $$(".race__day").each((index, element) => {
//       const headerText = $$(element).find(".header__text").text().trim();
//       const raceDate = headerText.split(", ")[1];

//       $$(element)
//         .find("tbody tr")
//         .each((i, row) => {
//           const horseName = $$(row).find(".horse-name a").text().trim();
//           const racecourse = $$(row).find(".racecourse-name").text().trim();
//           const timeLocal = $$(row).find(".time").text().trim();
//           const trainerJockey = $$(row).find(".trainer").text().trim();
//           const jockey = $$(row).find(".jockey").text().trim();
//           const raceName = $$(row).find(".race-name").text().trim();
//           const raceData = $$(row).find(".race-data").text().trim();

//           horseData.push({
//             raceDay: raceDate,
//             horseName,
//             racecourse,
//             timeLocal,
//             trainerJockey,
//             jockey,
//             raceName,
//             raceData,
//           });
//         });
//     });
//     console.log("Horse Data:", horseData); // On frontend

//     setHorseData(horseData);
//   };

//   const renderHorsesForDate = (date) => {
//     return (
//       <tbody key={date}>
//         <tr>
//           <th colSpan="6" className="th-colspan">
//             {date}
//           </th>
//         </tr>
//         {horseData
//           .filter((horse) => horse.raceDay === date)
//           .map((horse, index) => (
//             <tr key={index}>
//               <td>
//                 <Link to={`/godolphin/${horse.horseName}`}>
//                   {horse.horseName}
//                 </Link>
//               </td>
//               <td>{horse.racecourse}</td>
//               <td>{horse.trainerJockey}</td>
//               <td>{horse.jockey}</td>
//               <td>{horse.timeLocal}</td>
//               <td>
//                 <span className="race-name">{horse.raceName}</span>
//                 <br />
//                 <span className="race-data">{horse.raceData}</span>
//               </td>
//             </tr>
//           ))}
//       </tbody>
//     );
//   };

//   if (isLoading) return <div className="loading-spinner">Loading...</div>;

//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th>Horse Name</th>
//             <th>Racecourse</th>
//             <th>Trainer & Jockey</th>
//             <th>Jockey</th>
//             <th>Time (Local)</th>
//             <th>Race Details</th>
//           </tr>
//         </thead>
//         {Array.from(new Set(horseData.map((horse) => horse.raceDay))).map(
//           (date) => renderHorsesForDate(date)
//         )}
//       </table>
//     </div>
//   );
// }

// export default DolphinOwner;

































// import React, { useState, useEffect } from "react";
// import parse from "html-react-parser";
// import * as cheerio from "cheerio";

// import moment from "moment-timezone";
// import Time from "../components/Time/Time";
// import { Link } from "react-router-dom";
// // import "./index.scss";

// // import { };

// function DolphinOwner() {
//   const [data, setData] = useState("");
//   const [horseData, setHorseData] = useState([]);
//   const [countdown, setCountdown] = useState(60);
//   const [isLoading, setIsLoading] = useState(true);
//   const [horsesAge, setHorsesAge] = useState([]);
//   const [horseDetailsMap, setHorseDetailsMap] = useState({});

//   const currentJapanDate = moment().tz("Asia/Tokyo").format("DD-MM-YYYY");
//   const [isWorldTimesVisible, setIsWorldTimesVisible] = useState(true);

//   // const horseDetailsMap = {};

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/api/fetchData"); // Adjust port if necessary
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json(); // Expecting JSON, not text
//         setHorseData(data); // Store the fetched data
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchHorses = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/api/fetchHorses");
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const html1 = await response.text();
//         setHorsesAge(html1); // Update the horsesAge state
//         extractHorseHorses(html1);
//         setIsLoading(false);
//         // Start the countdown timer when Horses is fetched
//         startCountdown();
//       } catch (error) {
//         console.error("Error fetching Horses:", error);
//       }
//     };

//     fetchHorses();
//     // console.log(fetchHorses());
//   }, []);

//   useEffect(() => {
//     // Now that horse data is fetched, populate the horseDetailsMap
//     mapHorseDetailsToNames(horsesAge);
//     console.log("horseDetailsMap:", horseDetailsMap); // Log the horseDetailsMap
//   }, [horsesAge]);

//   const extractHorseHorses = (html1) => {
//     const $$ = cheerio.load(html1);
//     const horsesAgeData = [];

//     $$(".even, .odd").each((index, element) => {
//       const $horseInfo = $$(element);

//       const name = $horseInfo.find(".views-field-title a").text().trim();
//       const age = $horseInfo
//         .find(".views-field-field-horse-deceased")
//         .text()
//         .trim();
//       const gender = $horseInfo
//         .find(".views-field-field-horse-gender")
//         .text()
//         .trim();
//       const sire = $horseInfo
//         .find(".views-field-field-horse-sire")
//         .text()
//         .trim();
//       const dam = $horseInfo.find(".views-field-field-horse-dam").text().trim();
//       const trainer = $horseInfo
//         .find(".views-field-field-trainer")
//         .text()
//         .trim();
//       const country = $horseInfo
//         .find(".views-field-field-country")
//         .text()
//         .trim();

//       if (name) {
//         horsesAgeData.push({
//           name,
//           age,
//           gender,
//           sire,
//           dam,
//           trainer,
//           country,
//         });
//       }
//     });

//     setHorsesAge(horsesAgeData); // Set the state with horse details
//     mapHorseDetailsToNames(horsesAgeData);
//   };

//   const mapHorseDetailsToNames = (horsesAge) => {
//     const newHorseDetailsMap = {};
//     horsesAge.forEach((horse) => {
//       newHorseDetailsMap[horse.name] = {
//         name: horse.name,
//         age: horse.age,
//         gender: horse.gender,
//         sire: horse.sire,
//         dam: horse.dam,
//         trainer: horse.trainer,
//         country: horse.country,
//       };
//     });
//     setHorseDetailsMap(newHorseDetailsMap); // Update the state
//   };

//   const extractHorseData = (html) => {
//     const $ = cheerio.load(html);
//     const horseData = [];

//     const racecourseOffsets = {
//       "Belmont At The Big A                (USA)": 3, // GMT-3
//       "Hawkesbury                (AUS)": 18, // GMT+11
//       "Keeneland                (USA)": 3, // GMT-3
//       "Kyoto                (JPN)": 16, // GMT+9
//       "Tokyo                (JPN)": 16, // GMT+9
//       "Woodbine                (CAN)": 3, // GMT-3
//       "Indiana Grand                (USA)": 3, // GMT-3
//       "Leicester                (GB)": 8, // GMT+8
//       "Southwell (AW)                (GB)": 8, // GMT+8
//       "Nottingham                (GB)": 8, // GMT+8
//       "York                (GB)": 8, // GMT+8
//       "Delaware Park                (USA)": 3, // GMT-3
//       "Kempton (AW)                (GB)": 8, // GMT+8
//       "Wolverhampton (AW)                (GB)": 8, // GMT+8
//       "Lyon Parilly                (FR)": 8, // GMT+8
//       "Newmarket                (GB)": 8, // GMT+8
//       "Newcastle (AW)                (GB)": 8,
//       "Chantilly                (FR)": 9, // GMT+8
//       "Warwick Farm                (AUS)": 18,
//       "Chelmsford (AW)                (GB)": 8,
//       "Goodwood                (GB)": 8,
//       "Kyneton                (AUS)": 18,
//       "Kembla Grange                (AUS)": 18,
//       "Windsor                (GB)": 8,
//       "Yarmouth                (GB)": 8,
//       "Caulfield                (AUS)": 18,
//       "Echuca                (AUS)": 18,
//       "Ascot                (GB)": 8,
//       "Randwick                (AUS)": 18,
//     };

//     $(".race__day").each((index, element) => {
//       const headerText = $(element).find(".header__text").text().trim();
//       const raceDate = headerText.split(", ")[1];

//       $(element)
//         .find("tbody tr")
//         .each((i, row) => {
//           const horseName = $(row).find(".horse-name a").text().trim();
//           const racecourse = $(row).find(".racecourse-name").text().trim();
//           const timeLocal = $(row).find(".time").text().trim();
//           const trainerJockey = $(row).find(".trainer").text().trim();
//           const jockey = $(row).find(".jockey").text().trim();
//           const raceName = $(row).find(".race-name").text().trim();
//           const raceData = $(row).find(".race-data").text().trim();

//           // console.log(raceName);
//           //  console.log(raceData);

//           let timeZoneOffset = racecourseOffsets[racecourse] || 0;

//           const timeZoneIdentifier =
//             timeZoneOffset !== 0
//               ? `Etc/GMT${timeZoneOffset < 10 ? "-" : "+"}${Math.abs(
//                   timeZoneOffset
//                 )}`
//               : "UTC";

//           const localTime = moment.tz(timeLocal, "HH:mm", timeZoneIdentifier);
//           const gmtTime = localTime.clone().subtract(timeZoneOffset, "hours");
//           const currentDate = moment().format("DD MMMM YYYY");
//           // const dateAndTime =moment()+moment.tz(currentTime,)

//           const raceDateMoment = moment(raceDate, "DD MMMM YYYY");

//           const raceDateTime = moment(
//             `${raceDateMoment.format("DD MMMM YYYY")} ${timeLocal}`,
//             "DD MMMM YYYY HH:mm A"
//           );
//           const daysUntilRace = raceDateTime.diff(currentDate, "days");
//           // console.log(daysUntilRace);
//           // console.log(raceDateMoment);

//           const combinedDateTime = moment({
//             year: raceDateMoment.year(),
//             month: raceDateMoment.month(),
//             day: raceDateMoment.date(),
//             hour: localTime.hours(),
//             minute: localTime.minutes(),
//           });

//           const racecourseOffset = racecourseOffsets[racecourse] || 0;
//           const timeDifference = combinedDateTime
//             .clone()
//             .subtract(racecourseOffset, "hours");

//           const formattedTimeDifference = timeDifference.format(
//             "YYYY-MM-DD HH:mm:ss"
//           );

//           const newTimeDifference = moment().format("YYYY-MM-DD HH:mm:ss");

//           const duration = moment.duration(
//             Math.abs(
//               moment(formattedTimeDifference, "YYYY-MM-DD HH:mm:ss").diff(
//                 moment(newTimeDifference, "YYYY-MM-DD HH:mm:ss")
//               )
//             )
//           );

//           const howLong = `${duration.days()} days, ${duration.hours()} hours, ${duration.minutes()} minutes, and ${duration.seconds()} seconds`;

//           // console.log("timeDifference:", formattedTimeDifference);
//           // console.log("newTimeDifference:", newTimeDifference);
//           // console.log("howLong:", howLong);

//           const currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss");

//           // console.log(currentDateTime);

//           // console.log(
//           //   "combine",
//           //   combinedDateTime.format("YYYY-MM-DD HH:mm:ss")
//           // );

//           horseData.push({
//             raceDay: raceDate,
//             actualRaceDay: combinedDateTime.format("YYYY-MM-DD HH:mm:ss"),
//             currentDateTime,
//             horseName,
//             racecourse,
//             currentJapanDate,
//             timeLocal: localTime.format("hh:mm A"),
//             timeGMT: gmtTime.format("hh:mm A"),
//             adjustedCurrentDate: currentDate,
//             daysUntilRace,
//             trainerJockey,
//             jockey,
//             raceData,
//             raceName,
//             howLong,
//           });
//         });
//     });

//     // console.log(horseData);
//     setHorseData(horseData);
//   };

//   const uniqueDates = [...new Set(horseData.map((horse) => horse.raceDay))];

//   const renderHorsesForDate = (date) => {
//     return (
//       <tbody key={date}>
//         <tr>
//           <th colSpan="8" className="th-colspan">
//             {date}
//           </th>
//         </tr>
//         {horseData
//           .filter((horse) => horse.raceDay === date)
//           .map((horse, index) => (
//             <React.Fragment key={index}>
//               <tr className="horse-row">
//                 <td className="name">
//                   <Link to={`/owners/godolphin/${horse.horseName}`}>
//                     {horse.horseName}
//                   </Link>
//                 </td>
//                 <td>{horse.racecourse}</td>
//                 <td className="trainer-jockey">
//                   <span className="trainer">{horse.trainerJockey}</span>
//                   <br></br>
//                   <span className="jockey">{horse.jockey}</span>
//                 </td>
//                 <td>{horse.timeLocal}</td>
//                 <td className="race-details">
//                   <span className="race-name">{horse.raceName}</span>
//                   <br></br>
//                   <span className="race-data">{horse.raceData}</span>
//                 </td>
//                 <td>{horse.timeGMT}</td>
//                 <td>{horse.howLong}</td>
//                 <td>
//                   {horsesAge.find((h) => h.name === horse.horseName)?.gender}
//                 </td>
//                 {/* <td>
//                   <button
//                     className="button-alert"
//                     onClick={() => handleAlertClick(horse)}
//                   >
//                     ALERT
//                   </button>
//                   <button className="button-alert-all">ALERT ALL</button>
//                 </td> */}
//                 <td></td>
//               </tr>

//               <tr className="second-row">
//                 <td>
//                   Origin:{" "}
//                   {horsesAge.find((h) => h.name === horse.horseName)?.country}
//                 </td>
//                 <td
//                   className="country-td"
//                   id="img-fit"
//                   style={{
//                     background:
//                       horsesAge.find((h) => h.name === horse.horseName)
//                         ?.country === "UK"
//                         ? "url(/img/uk.png)"
//                         : horsesAge.find((h) => h.name === horse.horseName)
//                             ?.country === "Japan"
//                         ? "url(/img/JAPAN.jpg)" // Set the background image URL
//                         : horsesAge.find((h) => h.name === horse.horseName)
//                             ?.country === "France"
//                         ? "url(/img/france.png)"
//                         : horsesAge.find((h) => h.name === horse.horseName)
//                             ?.country === "USA"
//                         ? "url(/img/USA.jpg)"
//                         : horsesAge.find((h) => h.name === horse.horseName)
//                             ?.country === "UAE"
//                         ? "url(/img/UAE.png)"
//                         : horsesAge.find((h) => h.name === horse.horseName)
//                             ?.country === "Australia"
//                         ? "url(/img/aus.png)"
//                         : "transparent",
//                   }}
//                 >
//                   {/* Origin:{" "}
//                   {horsesAge.find((h) => h.name === horse.horseName)?.country} */}
//                 </td>

//                 <td colSpan="2">
//                   Age: {horsesAge.find((h) => h.name === horse.horseName)?.age}
//                 </td>
//                 <td colSpan="2">
//                   Sire:{" "}
//                   {horsesAge.find((h) => h.name === horse.horseName)?.sire}
//                 </td>
//                 <td colSpan="2">
//                   Dam: {horsesAge.find((h) => h.name === horse.horseName)?.dam}
//                 </td>
//                 <td colSpan="2">
//                   {/* <button
//                     className="button-alert"
//                     onClick={() => handleAlertClick(horse)}
//                   >
//                     ALERT
//                   </button> */}
//                   <button className="button-alert-all">ALERT ALL</button>
//                 </td>
//                 {/* <td colSpan="2">
//                   Trainer:{" "}
//                   {horsesAge.find((h) => h.name === horse.horseName)?.trainer}
//                 </td> */}
//               </tr>
//               <br></br>
//             </React.Fragment>
//           ))}
//       </tbody>
//     );
//   };

//   const startCountdown = () => {
//     const countdownInterval = setInterval(() => {
//       setCountdown((prevCountdown) => prevCountdown - 1);

//       if (countdown === 0) {
//         setCountdown(60);
//       }
//     }, 1000);

//     return () => {
//       clearInterval(countdownInterval);
//     };
//   };

//   if (isLoading) {
//     return <div className="loading-spinner">Loading...</div>;
//   }

//   const toggleWorldTimes = () => {
//     setIsWorldTimesVisible(!isWorldTimesVisible);
//   };

//   return (
//     <div>
//       <img src="../img/godolphin-logo.webp" alt="Godolphin Logo" />

//       <div className="toggle-button">
//         <button onClick={toggleWorldTimes}>Toggle World Times</button>
//         {isWorldTimesVisible && (
//           <div className="world-times">
//             <Time />
//           </div>
//         )}
//       </div>

//       <div className="time-content">
//         <div className="time-container"></div>
//         <table>
//           <thead>
//             <tr>
//               <th className="horse">Horse</th>
//               <th>
//                 Racecourse<br></br>
//               </th>
//               <th className="trainer-jockey">
//                 Trainer<br></br>Jockey
//               </th>
//               <th>Local Time</th>
//               <th className="horse-details">Race Details</th>
//               <th>PST</th>
//               <th>Minutes Until Post</th>
//               <th>Gender</th>
//               <th>Save Horse</th>
//             </tr>
//           </thead>
//           {uniqueDates.map((date) => renderHorsesForDate(date))}
//         </table>
//       </div>
//     </div>
//   );
// }

// export default DolphinOwner;
