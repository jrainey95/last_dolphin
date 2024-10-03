const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("./database");
const User = connection.models.User;
const validPassword = require('../lib/passwordUtils').validPassword; // Correct reference here

const customFields = {
  usernameField: 'uname',
  passwordField: 'pw',
  phoneNumber: 'phone'
};

const verifyCallback = (username, password, done) => {
  User.findOne({ username: username })
    .then((user) => {

      if (!user) { return done(null, false); }

      const isValid = validPassword(password, user.hash, user.salt); // Correct function usage here
      
      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      done(err);
    });
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id); // Store user ID in session
});

passport.deserializeUser((id, done) => {
  // Fetch user from DB using the ID stored in session
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

