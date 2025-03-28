const express = require("express");
require("dotenv").config();

console.log("the env var: ", process.env.PORT);

const PORT = process.env.PORT || 5000;

const path = require("path");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "you are coming to us live from server",
  });
});

app.get("/blog", async(req, res) => {

  const response = await prisma.user.create({
    data: {
      username: "pete_the_dog",
      first_name: "Peter",
      hash: "131242342",
      posts: {
        create: {
          title: "hello world",
          content: "this is a test from prisma",
        },
      },
    },
  });

  res.json({
    message: response,
  });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
