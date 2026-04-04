const { prisma } = require("../lib/prisma.js");

async function readUserComments(req, res) {
  const user = await prisma.user.findFirst({
    where: { cuid: req.params.userCuid },
    include: { comments: true },
  });
  res.json({ comments: user.comments, authData: req.authData });
}

module.exports = {
  readUserComments,
};
