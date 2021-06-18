const Joi = require("joi");
const express = require("express");
const auth = require("../middleware/auth");
// we get the router
const router = express.Router();

// instead of a database
const users = [
  { id: 1, name: "Naruto" },
  { id: 2, name: "Sasuki" },
  { id: 3, name: "Itachi" },
];

// we add routes to it
router.get("/", (req, res) => {
  res.send(users);
});

// * getting the current user (secure/authorized)
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password"); // mongoose code
  res.send(user);
});

// getting a single user (insecure/unauthorized)
router.get("/:id", (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user)
    return res.status(404).send("The user with the given ID wasn't found");
  res.send(user);
});

router.get("/api/posts/:year/:month", (req, res) => {
  //   res.send(req.params);
  res.send(req.query);
});

router.post("/", (req, res) => {
  // input validation
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  const result = schema.validate(req.body);
  // console.log(result);
  if (result.error) {
    // 400 Bad Request
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const user = {
    // the id is usually handled by the database
    id: users.length + 1,
    name: req.body.name,
  };
  // push it to our database
  users.push(user);
  // it's a convention to return the added item
  res.send(user);
});

router.put("/:id", (req, res) => {
  // look up the user; if it doesn't exist, return 404
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user)
    return res.status(404).send("The user with the given ID wasn't found");

  // validate; if invalid, return 400 Bad Request
  const result = validateUser(req.body);
  // console.log(result);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  // update user
  user.name = req.body.name; // we do this for all the properties

  // return the updated user
  res.send(user);
});

router.delete("/:id", (req, res) => {
  // look up the user; doesn't exist, return 404
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user)
    return res.status(404).send("The user with the given ID wasn't found");

  // delete
  const index = users.indexOf(user);
  users.splice(index, 1);

  // return the deleted user
  res.send(user);
});

// the validation logic in a function
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  // we return the result
  return schema.validate(user);
}

// we export the router
module.exports = router;
