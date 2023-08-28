const postService = require('../services/Post.service');

const findAll = async (req, res) => {
  const allPosts = await postService.findAll();
  return res.status(200).json(allPosts);
};

const findById = async (req, res) => {
  const id = Number(req.params.id);
  const selectedPost = await postService.findById(id);
  if (selectedPost.status !== 'SUCCESSFUL') {
    return res.status(404).json({ message: selectedPost.message });
  }
  return res.status(200).json(selectedPost.data);
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
  findById,
};