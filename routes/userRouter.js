const { Router } = require("express");
const userRouter = Router();

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

userRouter.get(
  "/:userCuid",
  authController.verifyToken,
  userController.readUserComments,
);

module.exports = userRouter;
