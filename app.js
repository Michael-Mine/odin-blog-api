require("dotenv").config();
const express = require("express");
const app = express();

const postsRouter = require("./routes/postsRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/posts", postsRouter);

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
