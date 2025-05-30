const prisma = require("../../prisma/prisma.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { BadRequestError, InternalServerError } = require("../utils/err");


async function authenticateUser(req, res, next) {
  const { username, password } = req.body;
  // find username
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      }
    });

    if (!user) {
      throw new BadRequestError("Username incorrect!");
    }
    const match = await bcrypt.compare(password, user.hash);

    if (!match) {
      return next(new BadRequestError("Password incorrect!"));
    }
    const opts = {}
    const secret = process.env.JWT_SECRET;
    opts.expiresIn = 1000000;
    // jwt sign token and respond with token
    const token = jwt.sign({ sub: user.id }, secret, opts);

    return res.status(200).json({
      message: "Auth passed",
      token,
      user,
    });

  } catch (err) {
    return next(new InternalServerError(err.message));
  }
}


module.exports = { authenticateUser };
