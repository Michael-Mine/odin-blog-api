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

async function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return res.status(403).json({ message: "user not authorised" });
  }
  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];
  const secret = process.env.JWT_SECRET;

  jwt.verify(bearerToken, secret, async (err, authData) => {
    if (err) {
      res.status(403).json({ message: "JWT not authorised" });
    } else {
      req.authData = authData;
      next();
    }
  });
}

module.exports = {
  login,
  verifyToken,
};
