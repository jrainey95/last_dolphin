const crypto = require("crypto");

// Function to validate password by comparing the hash
function validPassword(password, hash, salt) {
  // Generate the hash using the provided password and salt
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  // Compare the newly generated hash with the provided hash
  return hash === hashVerify;
}

// Function to generate hash and salt for a password
function genPassword(password) {
  // Generate a random salt
  const salt = crypto.randomBytes(32).toString("hex");
  // Generate a hash using the password and salt
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  // Return both the salt and the hash
  return { salt: salt, hash: hash };
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
