const { Router } = require("express");
const userRouter = Router();

const commentsController = require("../controllers/commentsController");

userRouter.get("/:userId", commentsController.getUserComments);

module.exports = userRouter;
