const { Router } = require("express");
const userRouter = Router();
const { createNewUser, updateUser } = require("../controllers/usersController.js");


userRouter.get("/", (req, res) => {
  res.send("Users GET request");
});

userRouter.post("/", createNewUser);

userRouter.put("/", updateUser);

userRouter.delete("/", (req, res) => {
  res.send("Users DELETE request");
});

module.exports = userRouter;
