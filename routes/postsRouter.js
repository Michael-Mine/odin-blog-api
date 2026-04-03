const { Router } = require("express");
const postsRouter = Router();

const postsController = require("../controllers/postsController");
const commentsController = require("../controllers/commentsController");

// (read all posts, no comments)
postsRouter.get("/", postsController.getAllPosts);

// (create post) (protected 2)
postsRouter.post("/", postsController.createPost);

// (read post and comments)
postsRouter.get("/:postId", postsController.getPost);

// (update post) (protected 2)
postsRouter.put("/:postId", postsController.updatePost);

// (delete post) (protected 2)
postsRouter.delete("/:postId", postsController.deletePost);

// (create comment 1)
postsRouter.post("/:postId/comments", commentsController.createComment);

// put  /posts/:postid/comments/:commentid  (update comment 2) ?
// del  /posts/:postid/comments/:commentid  (delete comment 2)

// get /user/:userid (read all comments) (protected 1)

module.exports = postsRouter;
