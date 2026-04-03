const { Router } = require("express");
const postsRouter = Router();

const postsController = require("../controllers/postsController");
const commentsController = require("../controllers/commentsController");

postsRouter.get("/", postsController.readAllPosts);

postsRouter.post("/", postsController.createPost);
postsRouter.get("/:postId", postsController.readPost);
postsRouter.put("/:postId", postsController.updatePost);
postsRouter.delete("/:postId", postsController.deletePost);

postsRouter.post("/:postId/comments", commentsController.createComment);

postsRouter.delete(
  "/:postId/comments/:commentId",
  commentsController.deleteComment,
);

module.exports = postsRouter;
