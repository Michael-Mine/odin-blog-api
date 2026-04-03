const { prisma } = require("../lib/prisma.js");

//protect to user
async function readUserComments(req, res) {
  const user = await prisma.user.findFirst({
    where: { cuid: req.params.userCuid },
    include: { comments: true },
  });
  res.json(user.comments);
}

module.exports = {
  readUserComments,
};
