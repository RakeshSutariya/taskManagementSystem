const messageString = {
  server: {
    _INTERNAL_SERVER_ERROR: "An internal server error occurred. Please try again later.",
    _TOO_MANY_REQUESTS: "Too many requests. Please try again later.",
    _TOKEN_REQUIRED: "Authentication token is required.",
    _TOKEN_EXPIRED: "Your session has expired. Please log in again.",
    _TOKEN_INVALID: "Invalid token. Please provide a valid token.",
    _BEARER_TOKEN_REQUIRED: "Bearer token is required for authentication."
  },
  user: {
    _VALIDATION_ERROR: "Validation error. Please check your input data.",
    _EMAIL_EXIST: "This email is already registered. Please log in or use a different email.",
    _REGISTRATION_SUCCESS: "User registered successfully.",
    _REGISTRATION_FAILED: "User registration failed. Please try again.",
    _EMAIL_NOT_REGISTER: "This email is not registered. Please check your email address.",
    _PASSWORD_DOES_NOT_MATCH: "The provided password does not match.",
    _LOGIN_FAILED: "Login failed. Please check your credentials.",
    _LOGIN_SUCCESS: "Login successful.",
    _LOGIN_EXPIRED: "Your session has expired. Please log in again.",
    _USER_DOES_NOT_EXIST: "User not found. Please register or check your details.",
    _TOKEN_INVALID: "Invalid token. Please provide a valid token.",
    _USER_ID_REQUIRED: "A valid user ID is required."
  },
  task: {
    _TITLE_EXIST: "A task with this title already exists. Please use a different title.",
    _CREATED_SUCCESS: "Task created successfully.",
    _TASK_CREATE_FAILED: "Failed to create task. Please try again.",
    _TASK_NOT_FOUND: "Task not found. Please check the task ID.",
    _NO_UPDATE_FOUND: "No updates were found.",
    _TASK_UPDATE_SUCCESS: "Task updated successfully.",
    _TASK_UPDATE_FAILED: "Failed to update task. Please try again.",
    _TASK_ID_REQUIRED: "Task ID is required.",
    _TASK_DELETE_SUCCESS: "Task deleted successfully.",
    _TASK_DELETE_FAILED: "Failed to delete task. Please try again.",
    _GET_TASK_SUCCESS: "Task retrieved successfully.",
    _GET_TASK_STATUS_COUNT_SUCCESS: "Task status counts retrieved successfully.",
    _DUE_DATE_MUST_BE_FUTURE_DATE: "Due date must always be set to a future date.!"
  }
};

module.exports = messageString;
