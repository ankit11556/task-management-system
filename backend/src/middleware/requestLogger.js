import logger from "../utils/logger.js";

export const requestLogger = (req, res, next) => {
  const safeBody = { ...req.body };

  //Password hide
  if (safeBody.password) {
    safeBody.password = "******";
  }
  logger.info({
    message: "Incoming Request",
    method: req.method,
    url: req.originalUrl,
    body: safeBody,
    timestamp: new Date().toISOString(),
  });

  next();
};
