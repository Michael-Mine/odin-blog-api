const { prisma } = require("../lib/prisma.js");

// protected to users
async function createComment(req, res) {
  const user = await prisma.user.findFirst({
    where: { username: req.authData.username },
  });

  const comments = await prisma.comment.create({
    data: {
      content: req.body.content,
      authorId: user.id,
      postId: Number(req.params.postId),
    },
  });
  res.json({ comments, authData: req.authData });
}

async function deleteComment(req, res) {
  const comment = await prisma.comment.delete({
    where: { id: Number(req.params.commentId) },
  });
  res.json(comment);
}

module.exports = {
  createComment,
  deleteComment,
};
