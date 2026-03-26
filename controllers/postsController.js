const { prisma } = require("../lib/prisma.js");

async function getPosts(req, res) {
  const posts = await prisma.post.findMany({
    where: { isPublished: true },
  });
  res.json(posts);
}

module.exports = {
  getPosts,
};
