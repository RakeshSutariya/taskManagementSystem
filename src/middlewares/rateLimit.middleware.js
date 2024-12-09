const rateLimit = require("express-rate-limit");

const config = require("../config");
const { errorCode, statusCode } = require("../utils/helpers/statusCode.helper");
const messageString = require("../utils/helpers/messageString.helper");
const responseHandler = require("../utils/helpers/responseHandler.helper");

const expressRateLimitMiddleware = rateLimit({
  windowMs: config.expressRateLimit.windowMs,
  max: config.expressRateLimit.limit,
  handler: (req, res) => {
    responseHandler(
      res,
      statusCode._TO_MANY_REQUEST,
      messageString.server._TO_MANY_REQUEST,
      errorCode._TO_MANY_REQUEST
    );
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false // Disable `X-RateLimit-*` headers
});

module.exports = expressRateLimitMiddleware;
