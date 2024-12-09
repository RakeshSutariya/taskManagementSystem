const messageString = require("../utils/helpers/messageString.helper");
const responseHandler = require("../utils/helpers/responseHandler.helper");
const { statusCode, errorCode } = require("../utils/helpers/statusCode.helper");

const validationMiddleware = (schema) => (req, res, next) => {
  try {
    const { body } = req;
    const { error, value } = schema.validate(body);
    if (!error) {
      req.body = value;
      next();
    } else {
      responseHandler(
        res,
        statusCode._BAD_REQUEST,
        error?.message.replace(/\\|"/g, "") || messageString.server._VALIDATION_ERROR,
        {
          code: errorCode._VALIDATION_ERROR
        }
      );
    }
  } catch (err) {
    responseHandler(res, statusCode._INTERNAL_SERVER_ERROR, messageString.server._INTERNAL_SERVER_ERROR, {
      code: errorCode._VALIDATION_ERROR
    });
  }
};

module.exports = validationMiddleware;
