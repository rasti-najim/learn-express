const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// * here we are applying the auth middleware to this route
router.get("/", auth, (req, res) => {
  res.send("Hello Express <3");
});

module.exports = router;
