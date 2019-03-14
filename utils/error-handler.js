function errorHandler(err, next) {
  const updErr = err;
  if (!updErr.statusCode) {
    updErr.statusCode = 500;
  }

  next(updErr);
}

module.exports = {
  errorHandler,
};
