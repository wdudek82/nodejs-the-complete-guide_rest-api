const { validationResult } = require('express-validator/check');

const posts = {
  posts: [
    {
      _id: 1,
      creator: {
        name: 'John Doe',
      },
      title: 'First Post',
      content: 'This is the first post',
      imageUrl: 'images/unicorn.jpg',
      createdAt: new Date(),
    },
    {
      _id: 2,
      creator: {
        name: 'John Doe',
      },
      title: 'Second Post',
      content: 'This is the second post',
      imageUrl: 'images/unicorn.jpg',
      createdAt: new Date(),
    },
    {
      _id: 3,
      creator: {
        name: 'John Doe',
      },
      title: 'Third Post',
      name: 'John Doe',
      content: 'This is the third post',
      imageUrl: 'images/unicorn.jpg',
      createdAt: new Date(),
    },
    {
      _id: 4,
      creator: {
        name: 'John Doe',
      },
      title: 'Fourth Post',
      name: 'John Doe',
      content: 'This is the fourth post',
      imageUrl: 'images/unicorn.jpg',
      createdAt: new Date(),
    },
    {
      _id: 5,
      creator: {
        name: 'John Doe',
      },
      title: 'Fifth Post',
      name: 'John Doe',
      content: 'This is the fifth post',
      imageUrl: 'images/unicorn.jpg',
      createdAt: new Date(),
    },
  ],
};

exports.getPosts = (req, res, next) => {
  res.status(200).json(posts);
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({
        message: 'Validation failed, entered data is incorrect.',
        errors: errors.array(),
      });
  }

  const { title, content, imageUrl } = req.body;

  const post = {
    _id: new Date().toISOString(),
    title,
    content,
    imageUrl,
    creator: { name: 'Max' },
    createdAt: new Date().toISOString(),
  };

  posts.posts.push(post);

  return res.status(201).json({
    message: 'Post created successfully!',
    post,
  });
};
