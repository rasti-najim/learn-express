const bcrypt = require("bcrypt");

// * we store the passwords in our database as hashes
// * 1234 -> abcd

async function run() {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash("1234", salt);

  // * the salt
  console.log(salt);
  // * the hashed password
  console.log(hashed);
}

run();

// * authentication
// const givenPassword = "" // req.body.password
// const passwordInTheDatabase = ""
// * we use this method to compare the given password with password stored in the database
// const validPassword = await bcrypt.compare(givenPassword, passwordInTheDatabase)
