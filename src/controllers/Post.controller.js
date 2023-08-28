const postService = require('../services/Post.service');

const findAll = async (req, res) => {
  const allPosts = await postService.findAll();
  return res.status(200).json(allPosts);
};

const insert = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const userId = req.user.id;
  const insertedPost = await postService.insert(userId, title, content, categoryIds);
  if (insertedPost.status !== 'SUCCESSFUL') {
    return res.status(400).json({ message: insertedPost.message });
  }
  return res.status(201).json({
    id: insertedPost.id,
    title,
    content,
    userId,
    updated: insertedPost.updated,
    published: insertedPost.updated,
  });
};

module.exports = {
  insert,
  findAll,
};