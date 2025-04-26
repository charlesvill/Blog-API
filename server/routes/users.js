const { Router } = require("express");
const userRouter = Router();
const { createNewUser, updateUser } = require("../controllers/usersController.js");
const passport = require("../authentication/passport-config.js");


userRouter.get("/", passport.authenticate('jwt', {session: false}), (req, res) => {

  res.send("coming to you live from an validated path!");

});

userRouter.post("/", createNewUser);

userRouter.put("/", updateUser);

userRouter.delete("/", (req, res) => {
  res.send("Users DELETE request");
});

module.exports = userRouter;
