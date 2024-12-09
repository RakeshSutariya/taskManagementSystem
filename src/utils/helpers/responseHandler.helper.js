const responseHandler = (res, statusCode, message, data = {}) => {
  let status = false;
  if (statusCode < 300) {
    status = true;
  }

  res.status(statusCode).json({
    status,
    message,
    data
  });
};

module.exports = responseHandler;
