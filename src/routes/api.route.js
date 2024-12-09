const express = require("express");

const routes = express.Router();
const { registrationValidation, loginValidation } = require("../utils/validations/user.validation");
const UserController = require("../controllers/user.controller");
const validationMiddleware = require("../middlewares/validation.middleware");
const TaskController = require("../controllers/task.controller");
const { createTaskValidation, updateTaskValidation } = require("../utils/validations/task.validation");
const CheckUserMiddleware = require("../middlewares/user.middleware");

routes.post("/register", validationMiddleware(registrationValidation), UserController.registration);

routes.post("/login", validationMiddleware(loginValidation), UserController.login);

routes.post("/tasks", CheckUserMiddleware, validationMiddleware(createTaskValidation), TaskController.createTask);

routes.get("/tasks", CheckUserMiddleware, TaskController.getTaskData);

routes.put("/tasks/:id", CheckUserMiddleware, validationMiddleware(updateTaskValidation), TaskController.updateTask);

routes.delete("/tasks/:id", CheckUserMiddleware, TaskController.deleteTask);

routes.get("/getCount/:id", TaskController.getStatusCount);

module.exports = routes;
