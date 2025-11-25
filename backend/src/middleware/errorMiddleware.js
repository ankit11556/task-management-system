const errorHandler = (err, req, res, next) => {
  console.log("Error: ", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  return res.status(statusCode).json({
    success: false,
    error: message,
  });
};

export default errorHandler;
