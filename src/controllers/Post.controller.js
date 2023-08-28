const postService = require('../services/Post.service');

const insert = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const newPost = postService.insert(title, content, categoryIds);
  console.log(newPost);
  return res.status(201).json({ title, content, categoryIds });
};

module.exports = {
  insert,
};