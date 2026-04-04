const { Router } = require("express");
const indexRouter = Router();

const signUpController = require("../controllers/signUpController");
const authController = require("../controllers/authController");

indexRouter.post("/sign-up", signUpController.signUpPost);
indexRouter.post("/log-in", authController.logInPost);
indexRouter.get("/log-out", authController.logOutGet);

module.exports = indexRouter;
