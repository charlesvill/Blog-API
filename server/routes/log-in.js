const { Router } = require("express");
const logInRouter = Router();
const { authenticateUser } = require("../authentication/authentication.js")

logInRouter.post("/", authenticateUser);

module.exports = logInRouter;
