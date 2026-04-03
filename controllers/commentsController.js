const { prisma } = require("../lib/prisma.js");

// protected to users
async function createComment(req, res) {
  // if (!req.user) res.status(401).redirect("/")
  const comments = await prisma.comment.create({
    data: {
      content: req.body.content,
      // authorId: req.user.id,
      authorId: 1,
      postId: Number(req.params.postId),
    },
  });
  res.json(comments);
}

module.exports = {
  createComment,
};
