const express = require("express");
const router = express.Router();
const passport = require("passport");
const genPassword = require("../lib/passwordUtils").genPassword;
const connection = require("../config/database");
const User = connection.models.User;
const isAuth = require("./authMiddleware").isAuth;

// ---------------- POST ROUTES ----------------

// Login user
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/account");
    });
  })(req, res, next);
});

// Register new user
// Register new user
router.post("/register", async (req, res, next) => {
  const saltHash = genPassword(req.body.pw);
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    username: req.body.uname,
    phoneNumber: req.body.phoneNumber, // Capture phone number here
    hash: hash,
    salt: salt,
    admin: true,
  });

  try {
    await newUser.save();
    res.redirect("/login");
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});


// Logout user
router.post("/logout", (req, res) => {
  console.log("Before logout - Session:", req.session);
  req.logout();
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error destroying session" });
    }
    console.log("After logout - Session destroyed");
    res.status(200).json({ message: "Logout successful" });
  });
});

// Helper function to get the current user
const getCurrentUser = (req) => {
  return req.isAuthenticated() ? req.user : null;
};

// Save horse
router.post("/saveHorse", async (req, res) => {
  const currentUser = getCurrentUser(req);

  if (!currentUser) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const { horseData } = req.body;

  try {
    const result = await User.updateOne(
      { _id: currentUser._id },
      { $addToSet: { savedHorses: horseData } }
    );

    if (result.nModified === 0) {
      return res
        .status(400)
        .json({ message: "Horse already saved or user not found" });
    }

    res.status(201).json({ message: "Horse saved successfully" });
  } catch (error) {
    console.error("Error saving horse:", error);
    res.status(500).json({ error: "Failed to save horse" });
  }
});

// Notify user
router.post("/notify", async (req, res) => {
  const { horseName, userPhoneNumber } = req.body;

  console.log("Received Phone Number:", userPhoneNumber);

  if (!userPhoneNumber) {
    return res.status(400).json({ error: "A 'To' phone number is required." });
  }

  try {
    const message = await client.messages.create({
      body: `Notification: The horse ${horseName} is scheduled to run soon.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: userPhoneNumber,
    });

    console.log("Message sent:", message.sid);
    res.status(200).json({ message: "Notification set up successfully!" });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ error: "Failed to send notification." });
  }
});

// ---------------- GET ROUTES ----------------

router.get("/", (req, res) => {
  res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
});

router.get("/login", (req, res) => {
  const form = `
    <h1>Login Page</h1>
    <form method="POST" action="/login">
      Enter Username:<br><input type="text" name="uname">
      <br>Enter Password:<br><input type="password" name="pw">
      <br><br><input type="submit" value="Submit">
    </form>`;
  res.send(form);
});

router.get("/register", (req, res) => {
  const form = `
    <h1>Register Page</h1>
    <form method="post" action="/register">
      Enter Username:<br><input type="text" name="uname">
      <br>Enter Password:<br><input type="password" name="pw">
      <br>Enter Phone Number:<br><input type="text" name="phoneNumber"> <!-- New field -->
      <br><br><input type="submit" value="Submit">
    </form>`;
  res.send(form);
});

router.get("/account", isAuth, (req, res) => {
  console.log("Account route accessed");
  res.json({
    username: req.user.username,
    admin: req.user.admin,
    savedHorses: req.user.savedHorses,
  });
});

// Other routes...

module.exports = router;
