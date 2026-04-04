const { prisma } = require("../lib/prisma.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function login(req, res, next) {
  try {
    let { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ message: "Incorrect username" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ username }, secret, { expiresIn: "7 days" });

    return res.status(200).json({ message: "Auth Passed", token });
  } catch (err) {
    return res.status(401).json({ message: "Auth Failed" });
  }
}

function logOutGet(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

module.exports = {
  login,
  logOutGet,
};
