const { Router } = require("express");
const userRouter = Router();

const userController = require("../controllers/userController");

userRouter.get("/:userCuid", userController.readUserComments);

module.exports = userRouter;
