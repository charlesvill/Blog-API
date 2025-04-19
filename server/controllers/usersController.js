const prisma = require("../../prisma/prisma.js");
const bcrypt = require("bcryptjs");

async function createNewUser(req, res, next) {
  const {
    id,
    username,
    first_name,
    last_name,
    password
  } = req.body;


  try {
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      const response = await prisma.user.create({
        data: {
          username,
          first_name,
          hash: hashedPassword
        }
      });
      
      console.log("user successfully created!", response);
    });
  } catch (error) {
    return next(error);
  }

  res.redirect("/log-in");

}

module.exports = {
  createNewUser,
};
