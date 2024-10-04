import React, { useState, useEffect } from "react";
import "./index.css";
import photo1 from "../../photos/GettyImages-1244520300-copy.jpg"; // Image 1
import photo2 from "../../photos/dubawi-worlds-greatest-stallion.jpg"; // Image 2
import photo3 from "../../photos/Anamoe.jpeg"; // Image 3

// Array of images and corresponding titles
const images = [
  { src: photo1, title: "Cody's Wish (USA)" },
  { src: photo2, title: "Dubawi, World's Greatest Stallion" },
  { src: photo3, title: "Anamoe" },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Rotate through images
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div className="main">
      <h1 className="welcome-header">Welcome to the Godolphin Alert Systems</h1>
      <nav className="navbar-container">
        <ul>
          <li>
            <a className="nav-link" href="register">
              Sign Up
            </a>
          </li>
          <li>
            <a className="nav-link" href="Account">
              Account
            </a>
          </li>
          <li>
            <a className="nav-link" href="godolphin">
              Runners
            </a>
          </li>
        </ul>
      </nav>
      <h1>{images[currentIndex].title}</h1>{" "}
      {/* Dynamic title based on current index */}
      {/* Wrap the image in an anchor tag */}
      <a href="/godolphin">
        <img
          src={images[currentIndex].src} // Use the current image source
          alt={images[currentIndex].title} // Use the current title for alt text
          className="homepage-image"
        />
      </a>
    </div>
  );
};

export default Home;
