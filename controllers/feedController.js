const posts = {
  posts: [
    { title: 'First Post', content: 'This is the first post' },
    { title: 'Second Post', content: 'This is the second post' },
    { title: 'Third Post', content: 'This is the third post' },
    { title: 'Fourth Post', content: 'This is the fourth post' },
    { title: 'Fifth Post', content: 'This is the fifth post' },
  ]
};

exports.getPosts = (req, res, next) => {
  res.status(200).json(posts);
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  res.status(201).json({
    message: 'Post created successfully!',
    post: {
      id: new Date().toISOString(),
      title,
      content,
    }
    });
};
