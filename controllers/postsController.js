const { body, validationResult, matchedData } = require("express-validator");
const { prisma } = require("../lib/prisma.js");
const CustomNotFoundError = require("../errors/CustomNotFoundError");

async function readPublishedPosts(req, res) {
  const posts = await prisma.post.findMany({
    where: { isPublished: true },
  });
  res.json(posts);
}

async function readPost(req, res) {
  const post = await prisma.post.findUnique({
    where: { id: Number(req.params.postId) },
    include: { comments: true },
  });
  if (!post) {
    throw new CustomNotFoundError("Post not found");
  }
  res.json(post);
}

async function readAllPosts(req, res) {
  const posts = await prisma.post.findMany();
  res.json(posts);
}

const lengthErr = "must be between 10 and 50 characters.";
const validatePost = [
  body("title")
    .trim()
    .isLength({ min: 10, max: 50 })
    .withMessage(`Title ${lengthErr}`),
  body("content").trim(),
];

const createPost = [
  validatePost,
  async (req, res, next) => {
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    try {
      const post = await prisma.post.create({
        data: {
          title: req.body.title,
          content: req.body.content,
        },
      });
      res.json({ message: "post created", post, authData: req.authData });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },
];

const updatePost = [
  validatePost,
  async (req, res, next) => {
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    try {
      const post = await prisma.post.update({
        where: { id: Number(req.params.postId) },
        data: {
          title: req.body.title,
          content: req.body.content,
        },
      });
      if (!post) {
        throw new CustomNotFoundError("Post not found");
      }
      res.json({ message: "post updated", post, authData: req.authData });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },
];

async function deletePost(req, res) {
  const post = await prisma.post.delete({
    where: { id: Number(req.params.postId) },
  });
  if (!post) {
    throw new CustomNotFoundError("Post not found");
  }
  res.json({ message: "post deleted", post, authData: req.authData });
}

module.exports = {
  readPublishedPosts,
  readPost,
  readAllPosts,
  createPost,
  updatePost,
  deletePost,
};
