const { Router } = require("express");
const indexRouter = Router();

const signUpController = require("../controllers/signUpController");
const authController = require("../controllers/authController");

indexRouter.post("/sign-up", signUpController.signUpPost);
indexRouter.post("/login", authController.login);
indexRouter.get("/log-out", authController.logOutGet);

module.exports = indexRouter;
