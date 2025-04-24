const { Router } = require("express");
const logInRouter = Router();


logInRouter.post("/", (req, res, next) => {
  // check for user data 

  // get the username and hash
  // username matches, run bcrypt to comare has
  // if it works, jwt sign return the token
})
