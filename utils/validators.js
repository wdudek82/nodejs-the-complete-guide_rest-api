const { body } = require('express-validator/check');

exports.validatePost = () => {
  return [
    body('title')
      .trim()
      .isLength({ min: 5 }),
    body('content')
      .trim()
      .isLength({ min: 5 }),
  ];
};
