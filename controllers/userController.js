const { prisma } = require("../lib/prisma.js");
const jwt = require("jsonwebtoken");

async function readUserComments(req, res) {
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
      const user = await prisma.user.findFirst({
        where: { cuid: req.params.userCuid },
        include: { comments: true },
      });
      res.json({ comments: user.comments, authData });
    }
  });
}

module.exports = {
  readUserComments,
};
