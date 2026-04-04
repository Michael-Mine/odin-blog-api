const { prisma } = require("../lib/prisma.js");

async function readAllPosts(req, res) {
  const posts = await prisma.post.findMany({
    where: { isPublished: true },
  });
  res.json(posts);
}

async function readPost(req, res) {
  const posts = await prisma.post.findUnique({
    where: { id: Number(req.params.postId) },
    include: { comments: true },
  });
  res.json(posts);
}

async function createPost(req, res) {
  const post = await prisma.post.create({
    data: {
      title: req.body.title,
      content: req.body.content,
    },
  });
  res.json({ post, authData: req.authData });
}

async function updatePost(req, res) {
  const post = await prisma.post.update({
    where: { id: Number(req.params.postId) },
    data: {
      title: req.body.title,
      content: req.body.content,
    },
  });
  res.json({ post, authData: req.authData });
}

async function deletePost(req, res) {
  const post = await prisma.post.delete({
    where: { id: Number(req.params.postId) },
  });
  res.json({ post, authData: req.authData });
}

module.exports = {
  readAllPosts,
  readPost,
  createPost,
  updatePost,
  deletePost,
};
