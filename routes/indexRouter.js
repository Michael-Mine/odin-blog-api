const { Router } = require("express");
const indexRouter = Router();

const signUpController = require("../controllers/signUpController");
const authController = require("../controllers/authController");

indexRouter.post("/sign-up", signUpController.signUpPost);
indexRouter.post("/login", authController.loginUser);
indexRouter.post("/login-author", authController.loginAuthor);

module.exports = indexRouter;
