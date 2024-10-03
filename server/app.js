const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const MongoStore = require("connect-mongo")(session);
const routes = require("./routes");
const connection = require("./config/database");
const twilio = require("twilio"); // Add Twilio

// Load environment variables from .env file
require("dotenv").config();

// Initialize the Express application
const app = express();

// Twilio setup
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:3001", // Adjust this to the actual frontend URL
    credentials: true, // Allow credentials (cookies, etc.)
  })
);

// Session setup
const sessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SECRET, // Secret for signing the session ID cookie
    resave: false, // Do not save session if unmodified
    saveUninitialized: false, // Save uninitialized sessions
    store: sessionStore,
    cookie: { secure: false },
  })
);

// Initialize Passport.js for authentication
app.use(passport.initialize());
app.use(passport.session());

// Import Passport configuration
require("./config/passport");

// Logging for debugging
app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

// Route handling
app.use(routes);

// Twilio SMS Route
app.post("/notify", async (req, res) => {
  const { horseName, userPhoneNumber } = req.body;

  try {
    const message = await twilioClient.messages.create({
      body: `Your horse ${horseName} is scheduled to run soon!`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: userPhoneNumber,
    });

    console.log("Message sent:", message.sid);
    res.status(200).send("Notification sent successfully.");
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).send("Failed to send notification.");
  }
});

// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
