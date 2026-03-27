const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  
  const response = {
    error: err.message || 'Internal server error'
  };

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
