const express = require("express");
require("dotenv").config();

console.log("the env var: ", process.env.PORT);

const PORT = process.env.PORT || 5000;

const path = require("path");

const app = express();

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "you are coming to us live from server",
  });
});

app.get("/blog", (req, res) => {
  res.json({
    message: "this is coming from the blog route",
  });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
