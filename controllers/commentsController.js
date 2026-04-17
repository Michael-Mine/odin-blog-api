const { body, validationResult, matchedData } = require("express-validator");
const { prisma } = require("../lib/prisma.js");
const CustomNotFoundError = require("../errors/CustomNotFoundError");

async function readComments(req, res) {
  const comments = await prisma.comment.findMany({
    where: { postId: Number(req.params.postId) },
    include: {
      author: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });
  res.json(comments);
}

const lengthErr = "must be between 1 and 400 characters.";
const validateCommentContent = [
  body("content")
    .trim()
    .isLength({ min: 1, max: 40 })
    .withMessage(`Comment ${lengthErr}`),
];

const createComment = [
  validateCommentContent,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    try {
      const { content } = matchedData(req);
      const user = await prisma.user.findFirst({
        where: { username: req.authData.username },
      });

      const comment = await prisma.comment.create({
        data: {
          content: content,
          authorId: user.id,
          postId: Number(req.params.postId),
        },
      });
      if (!comment) {
        throw new CustomNotFoundError("Post not found");
      }

      res.json({ message: "comment created", comment, authData: req.authData });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },
];

async function deleteComment(req, res) {
  const comment = await prisma.comment.delete({
    where: { id: Number(req.params.commentId) },
  });
  if (!comment) {
    throw new CustomNotFoundError("Comment not found");
  }
  res.json({ message: "comment deleted", comment, authData: req.authData });
}

module.exports = {
  readComments,
  createComment,
  deleteComment,
};
