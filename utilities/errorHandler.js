module.exports = (error, req, res, next) => {
  return res.status(500).json({
    error: error.message,
    stack: error.stack,
  });
};
