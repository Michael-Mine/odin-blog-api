const { Router } = require("express");
const postsRouter = Router();

const authController = require("../controllers/authController");
const postsController = require("../controllers/postsController");
const commentsController = require("../controllers/commentsController");

postsRouter.get("/", postsController.readPublishedPosts);

postsRouter.get(
  "/all",
  authController.verifyTokenAuthor,
  postsController.readAllPosts,
);

postsRouter.post(
  "/",
  authController.verifyTokenAuthor,
  postsController.createPost,
);

postsRouter.put(
  "/:postId",
  authController.verifyTokenAuthor,
  postsController.updatePost,
);
postsRouter.delete(
  "/:postId",
  authController.verifyTokenAuthor,
  postsController.deletePost,
);

postsRouter.get("/:postId/comments", commentsController.readComments);

postsRouter.post(
  "/:postId/comments",
  authController.verifyTokenUser,
  commentsController.createComment,
);

postsRouter.delete(
  "/:postId/comments/:commentId",
  authController.verifyTokenAuthor,
  commentsController.deleteComment,
);

module.exports = postsRouter;
