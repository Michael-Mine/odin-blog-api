require("dotenv").config();
const express = require("express");
const app = express();

const postsRouter = require("./routes/postsRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// get  /posts       (read all posts, no comments)
app.use("/posts", postsRouter);
// post /posts          (create post) (protected 2)

// get  /posts/:postid  (read post)
// put  /posts/:postid  (update post) (protected 2)
// del  /posts/:postid  (delete post) (protected 2)

// get  /posts/:postid/comments         (read all comments) ?
// post /posts/:postid/comments             (create comment 1)

// get  /posts/:postid/comments/:commentid  (read comment 2)
// put  /posts/:postid/comments/:commentid  (update comment 2)
// del  /posts/:postid/comments/:commentid  (delete comment 2)

// get /user/:userid (read all comments) (protected 1)

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
