require("dotenv").config();
const express = require("express");
const app = express();

const session = require("express-session");
const passport = require("passport");

const postsRouter = require("./routes/postsRouter");
const userRouter = require("./routes/userRouter");
const indexRouter = require("./routes/indexRouter");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/posts", postsRouter);
app.use("/user", userRouter);
app.use("/", indexRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app listening on port ${PORT}!`);
});

// install cors
// add search query routes
// add custom error & others
