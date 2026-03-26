const { prisma } = require("../lib/prisma.js");

// move prisma requests to separate file?
async function getAllPosts(req, res) {
  const posts = await prisma.post.findMany({
    where: { isPublished: true },
  });
  res.json(posts);
}

async function getPost(req, res) {
  const posts = await prisma.post.findUnique({
    where: { id: Number(req.params.postId) },
    include: { comments: true },
  });
  res.json(posts);
}

module.exports = {
  getAllPosts,
  getPost,
};
