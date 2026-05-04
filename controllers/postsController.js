const { body, validationResult, matchedData } = require("express-validator");
const { prisma } = require("../lib/prisma.js");
const CustomNotFoundError = require("../errors/CustomNotFoundError");

async function readPublishedPosts(req, res) {
  const posts = await prisma.post.findMany({
    where: { isPublished: true },
    select: {
      id: true,
      title: true,
      content: true,
      picUrl: true,
      datePublished: true,
    },
  });
  res.json(posts);
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
  body("picUrl").trim(),
  body("isPublished").trim(),
  body("datePublished").trim(),
];

const createPost = [
  validatePost,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    try {
      const { title, content, picUrl } = matchedData(req);
      const post = await prisma.post.create({
        data: {
          title,
          content,
          picUrl,
        },
      });
      res.json({ message: "post created", post, authData: req.authData });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },
];

function formatDate(datePublished) {
  const timestamp = Date.parse(datePublished);
  return new Date(timestamp);
}

const updatePost = [
  validatePost,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    try {
      const { title, content, picUrl, isPublished, datePublished } =
        matchedData(req);
      let date = null;
      if (datePublished !== "") {
        date = formatDate(datePublished);
      }
      const post = await prisma.post.update({
        where: { id: Number(req.params.postId) },
        data: {
          title,
          content,
          picUrl,
          isPublished: JSON.parse(isPublished),
          datePublished: date,
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
  readAllPosts,
  createPost,
  updatePost,
  deletePost,
};
