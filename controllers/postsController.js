const { prisma } = require("../lib/prisma.js");

// move prisma requests to separate file?
async function readAllPosts(req, res) {
  const posts = await prisma.post.findMany({
    where: { isPublished: true },
  });
  res.json(posts);
}

//protect to author
async function createPost(req, res) {
  const post = await prisma.post.create({
    data: {
      title: req.body.title,
      content: req.body.content,
    },
  });
  res.json(post);
}

async function readPost(req, res) {
  const posts = await prisma.post.findUnique({
    where: { id: Number(req.params.postId) },
    include: { comments: true },
  });
  res.json(posts);
}

//protect to author
async function updatePost(req, res) {
  const post = await prisma.post.update({
    where: { id: Number(req.params.postId) },
    data: {
      title: req.body.title,
      content: req.body.content,
    },
  });
  res.json(post);
}

//protect to author
async function deletePost(req, res) {
  const post = await prisma.post.delete({
    where: { id: Number(req.params.postId) },
  });
  res.json(post);
}

module.exports = {
  readAllPosts,
  createPost,
  readPost,
  updatePost,
  deletePost,
};
