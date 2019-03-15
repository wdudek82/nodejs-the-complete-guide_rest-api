const jwt = require('jsonwebtoken');

const secret = '!LjvDNIboMh@?M3Z1-/Uz70o:98piA';

module.exports = (req, res, next) => {
  // Extract token from Authorization request header
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }

  const [, token] = authHeader.split(' ');

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, secret);
  } catch (err) {
    // err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;

  next();
};
