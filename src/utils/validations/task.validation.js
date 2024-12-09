const joi = require("joi");

const { taskStatus } = require("../../const/enum");

const createTaskValidation = joi.object({
  title: joi.string().min(3).max(30).required(),
  description: joi.string().min(3).max(200).required(),
  dueDate: joi.string().required(),
  status: joi.string().valid(taskStatus.PENDING, taskStatus.INPROGRESS, taskStatus.COMPLETED).required()
});

const updateTaskValidation = joi.object({
  title: joi.string().min(3).max(30),
  description: joi.string().min(3).max(200),
  dueDate: joi.string(),
  status: joi.string().valid(taskStatus.PENDING, taskStatus.INPROGRESS, taskStatus.COMPLETED)
});

module.exports = {
  createTaskValidation,
  updateTaskValidation
};
