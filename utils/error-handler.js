function errorHandler(err, next) {
  const updErr = err;
  if (!updErr.statusCode) {
    updErr.statusCode = 500;
  }

  next(updErr);
}

function validationError(errorMessage) {
  const error = new Error(errorMessage);
  error.statusCode = 422;
  throw error;
}

module.exports = {
  errorHandler,
  validationError,
};
