const { body } = require('express-validator/check');
const { User } = require('../models/userModel');

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

exports.validateUser = () => {
  return [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom((value, { req }) => {
        User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(new Error('E-Mail address already exists!'));
          }
          return Promise.resolve();
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 }),
    body('name')
      .trim()
      .not()
      .isEmpty(),
  ];
};
