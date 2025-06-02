const { Router } = require("express");
const userRouter = Router();
const { createNewUser, updateUser } = require("../controllers/usersController.js");
const passport = require("../authentication/passport-config.js");



userRouter.get("/", passport.authenticate('jwt', {session: false}), (req, res) => {
  console.log(req.user);
  res.json(req.user);
});

userRouter.post("/", createNewUser);

userRouter.put("/", updateUser);

userRouter.delete("/", (req, res) => {
  res.send("Users DELETE request");
});

module.exports = userRouter;
