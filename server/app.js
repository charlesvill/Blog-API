const express = require("express");
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const path = require("path");
const passport = require("./authentication/passport-config.js");
const { NotFoundError } = require("./utils/err.js");
const logInRouter = require("./routes/log-in.js");
const postRouter = require("./routes/posts.js");
const userRouter = require("./routes/users.js");

const app = express();
const assetsPath = path.join(__dirname, "public");

const allowedOrigins = [
  "http://localhost:5173",
  "https://blog-odin.netlify.app",
];

app.use(express.static(assetsPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(
  cors({
    origin: function(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.json({
    message: "you are coming to us live from index",
  });
});
app.use("/log-in", logInRouter);

app.use("/users", userRouter);

app.use("/posts", postRouter);

app.use((req, res, next) => {
  return next(new NotFoundError(`404: Not Found! path: ${req.path}`));
});

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.statusCode || 500)
    .send(err.name + " " + err.statusCode + ": " + err.message);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
