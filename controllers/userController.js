const { prisma } = require("../lib/prisma.js");
const CustomNotFoundError = require("../errors/CustomNotFoundError");

async function readUserComments(req, res) {
  const user = await prisma.user.findFirst({
    where: { cuid: req.params.userCuid },
    include: { comments: true },
  });
  if (!user) {
    throw new CustomNotFoundError("User not found");
  }
  res.json({ comments: user.comments, authData: req.authData });
}

module.exports = {
  readUserComments,
};
