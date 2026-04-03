const { Router } = require("express");
const indexRouter = Router();

const authController = require("../controllers/authController");
const signUpController = require("../controllers/signUpController");

indexRouter.post("/log-in", authController.logInPost);
indexRouter.get("/log-out", authController.logOutGet);

indexRouter.get("/sign-up", signUpController.signUpGet);
indexRouter.post("/sign-up", signUpController.signUpPost);

module.exports = indexRouter;
