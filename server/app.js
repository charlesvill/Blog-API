const express = require("express");
require("dotenv").config();


const PORT = process.env.PORT || 5000;
const path = require("path");
const prisma = require("../prisma/prisma.js");
const { NotFoundError } = require("./utils/err.js");
const userRouter = require("./routes/users.js");

const app = express();
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "you are coming to us live from index",
  });
});

app.use("/users", userRouter);
// app.get("/blog", async(req, res) => {

//   const response = await prisma.user.create({
//     data: {
//       username: "pete_the_dog",
//       first_name: "Peter",
//       hash: "131242342",
//       posts: {
//         create: {
//           title: "hello world",
//           content: "this is a test from prisma",
//         },
//       },
//     },
//   });

//   res.json({
//     message: response,
//   });
// });

app.use((req, res, next) => {
  return next(new NotFoundError("404: Not Found!"));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
