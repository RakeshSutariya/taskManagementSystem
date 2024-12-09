const statusCode = {
  _OK: 200,
  _CREATED: 201,
  _NOT_UPDATED: 304,
  _BAD_REQUEST: 400,
  _UNAUTHORIZED: 401,
  _TOKEN_EXPIRED: 498,
  _DATA_NOT_FOUND: 404,
  _INTERNAL_ERROR: 500,
  _TO_MANY_REQUEST: 429
};

const errorCode = {
  _INTERNAL_SERVER_ERROR: "internalServerError",
  _VALIDATION_ERROR: "validationError",
  _EMAIL_EXIST: "emailAlreadyExist",
  _REGISTRATION_FAILED: "registrationFailed",
  _TO_MANY_REQUEST: "toManyRequest",
  _EMAIL_NOT_REGISTER: "emailNotRegister",
  _PASSWORD_DOES_NOT_MATCH: "passwordNotMatch",
  _LOGIN_FAILED: "loginFailed",
  _TOKEN_REQUIRED: "tokenRequired",
  _BEARER_TOKEN_REQUIRED: "bearerTokenRequired",
  _USER_DOES_NOT_EXIST: "userDoesNotExist",
  _TITLE_EXIST: "titleAlreadyExist",
  _TASK_CREATE_FAILED: "taskCreatedFailed",
  _TASK_NOT_FOUND: "taskNotFound",
  _NO_ANY_UPDATE_FOUND: "noAnyUpdate",
  _TASK_UPDATE_FAILED: "taskUpdateFailed",
  _TASK_ID_REQUIRED: "taskIdIsRequired",
  _TASK_DELETE_FAILED: "taskDeleteFailed",
  _USER_ID_REQUIRED: "userIdRequired",
  _DUE_DATE_MUST_BE_FUTURE_DATE: "dueDateMustBeFutureDate"
};

module.exports = {
  statusCode,
  errorCode
};
