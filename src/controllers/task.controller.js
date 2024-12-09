const messageString = require("../utils/helpers/messageString.helper");
const responseHandler = require("../utils/helpers/responseHandler.helper");
const { statusCode, errorCode } = require("../utils/helpers/statusCode.helper");
const TaskModel = require("../models/task.model");
const { taskStatus } = require("../const/enum");
const { default: mongoose } = require("mongoose");

const TaskController = {
  async createTask(req, res) {
    try {
      const { body } = req;
      if (new Date(body.dueDate) <= new Date()) {
        return responseHandler(res, statusCode._BAD_REQUEST, messageString.task._DUE_DATE_MUST_BE_FUTURE_DATE, {
          code: errorCode._DUE_DATE_MUST_BE_FUTURE_DATE
        });
      }
      const checkTitle = await TaskModel.findOne({ title: body.title }, "title").lean();
      if (checkTitle) {
        console.log("err =====Already task title==>>>");
        responseHandler(res, statusCode._BAD_REQUEST, messageString.task._TITLE_EXIST, {
          code: errorCode._TITLE_EXIST
        });
      } else {
        const createTaskSchema = new TaskModel({
          title: body.title,
          description: body.description,
          dueDate: new Date(body.dueDate),
          status: body.status,
          userId: req.userId
        });

        const saveData = await createTaskSchema.save();
        if (saveData && saveData._id) {
          responseHandler(res, statusCode._OK, messageString.task._CREATED_SUCCESS);
        } else {
          console.log("err =====insert task database==>>>");
          responseHandler(res, statusCode._BAD_REQUEST, messageString.task._TASK_CREATE_FAILED, {
            code: errorCode._TASK_CREATE_FAILED
          });
        }
      }
    } catch (err) {
      console.log("err =====create task catch==>>>", JSON.stringify(err, null, 2));
      responseHandler(res, statusCode._INTERNAL_ERROR, messageString.server._INTERNAL_SERVER_ERROR, {
        code: errorCode._INTERNAL_SERVER_ERROR
      });
    }
  },

  async getTaskData(req, res) {
    try {
      const { query } = req;
      console.log("query ======>>", query);

      let condition = {
        userId: req.userId
      };
      if (query.status && query.status === taskStatus.PENDING) {
        condition["status"] = taskStatus.PENDING;
      } else if (query.status && query.status === taskStatus.INPROGRESS) {
        condition["status"] = taskStatus.INPROGRESS;
      } else if (query.status && query.status === taskStatus.COMPLETED) {
        condition["status"] = taskStatus.COMPLETED;
      }

      if (query.dueDate) {
        condition["dueDate"] = { $lte: new Date(query.dueDate) };
      }

      const getTask = await TaskModel.find(condition, "title description dueDate status").lean();
      responseHandler(res, statusCode._OK, messageString.task._GET_TASK_SUCCESS, getTask.length ? getTask : []);
    } catch (err) {
      console.log("err =====get task catch==>>>", JSON.stringify(err, null, 2));
      responseHandler(res, statusCode._INTERNAL_ERROR, messageString.server._INTERNAL_SERVER_ERROR, {
        code: errorCode._INTERNAL_SERVER_ERROR
      });
    }
  },

  async updateTask(req, res) {
    try {
      const { params } = req;
      const { query } = req;
      if (new Date(query.dueDate) <= new Date()) {
        return responseHandler(res, statusCode._BAD_REQUEST, messageString.task._DUE_DATE_MUST_BE_FUTURE_DATE, {
          code: errorCode._DUE_DATE_MUST_BE_FUTURE_DATE
        });
      }
      if (!params.id) {
        console.log("err =====task id is required==>>>");
        responseHandler(res, statusCode._BAD_REQUEST, messageString.task._TASK_ID_REQUIRED, {
          code: errorCode._TASK_ID_REQUIRED
        });
      }
      const getTask = await TaskModel.findOne({ _id: params.id, userId: req.userId }, "title").lean();
      if (getTask) {
        let updateData = {};
        if (query.title) {
          updateData["title"] = query.title;
        }
        if (query.description) {
          updateData["description"] = query.description;
        }
        if (query.dueDate) {
          updateData["dueDate"] = new Date(query.dueDate);
        }
        if (query.status) {
          updateData["status"] = query.status;
        }
        if (Object.keys(updateData).length) {
          await TaskModel.updateOne(
            {
              _id: getTask._id
            },
            {
              $set: updateData
            },
            {
              upsert: true
            }
          )
            .then(() => {
              responseHandler(res, statusCode._OK, messageString.task._TASK_UPDATE_SUCCESS);
            })
            .catch((err) => {
              console.log("err =====task update failed==>>>");
              responseHandler(res, statusCode._BAD_REQUEST, messageString.task._TASK_UPDATE_FAILED, {
                code: errorCode._TASK_UPDATE_FAILED
              });
            });
        } else {
          console.log("err =====No any update==>>>");
          responseHandler(res, statusCode._BAD_REQUEST, messageString.task._NO_ANY_UPDATE_FOUND, {
            code: errorCode._NO_ANY_UPDATE_FOUND
          });
        }
      } else {
        console.log("err =====update task data not found==>>>");
        responseHandler(res, statusCode._BAD_REQUEST, messageString.task._TASK_NOT_FOUND, {
          code: errorCode._TASK_NOT_FOUND
        });
      }
    } catch (err) {
      console.log("err =====update task catch==>>>", JSON.stringify(err, null, 2));
      responseHandler(res, statusCode._INTERNAL_ERROR, messageString.server._INTERNAL_SERVER_ERROR, {
        code: errorCode._INTERNAL_SERVER_ERROR
      });
    }
  },

  async deleteTask(req, res) {
    try {
      const { params } = req;
      if (!params.id) {
        console.log("err =====delete task id is required==>>>");
        responseHandler(res, statusCode._BAD_REQUEST, messageString.task._TASK_ID_REQUIRED, {
          code: errorCode._TASK_ID_REQUIRED
        });
      }
      const getTask = await TaskModel.findOne({ _id: params.id, userId: req.userId }, "title").lean();
      if (getTask) {
        await TaskModel.deleteOne({
          _id: getTask._id
        })
          .then(() => {
            responseHandler(res, statusCode._OK, messageString.task._TASK_DELETE_SUCCESS);
          })
          .catch((err) => {
            console.log("err =====task delete failed==>>>");
            responseHandler(res, statusCode._BAD_REQUEST, messageString.task._TASK_DELETE_FAILED, {
              code: errorCode._TASK_DELETE_FAILED
            });
          });
      } else {
        console.log("err =====delete task data not found==>>>");
        responseHandler(res, statusCode._BAD_REQUEST, messageString.task._TASK_NOT_FOUND, {
          code: errorCode._TASK_NOT_FOUND
        });
      }
    } catch (err) {
      console.log("err =====delete task catch==>>>", JSON.stringify(err, null, 2));
      responseHandler(res, statusCode._INTERNAL_ERROR, messageString.server._INTERNAL_SERVER_ERROR, {
        code: errorCode._INTERNAL_SERVER_ERROR
      });
    }
  },

  async getStatusCount(req, res) {
    try {
      const { params } = req;
      const { query } = req;
      if (!params.id) {
        console.log("err ==status count===task id is required==>>>");
        responseHandler(res, statusCode._BAD_REQUEST, messageString.user._USER_ID_REQUIRED, {
          code: errorCode.user._USER_ID_REQUIRED
        });
      }
      let condition = {
        userId: new mongoose.Types.ObjectId(params.id)
      };
      if (query.startDate && query.endDate) {
        condition["dueDate"] = {
          $gte: new Date(query.startDate),
          $lte: new Date(query.endDate)
        };
      } else if (query.startDate) {
        condition["dueDate"] = {
          $gte: new Date(query.startDate)
        };
      } else if (query.endDate) {
        condition["dueDate"] = {
          $lte: new Date(query.endDate)
        };
      }

      let getTaskStatusCount = await TaskModel.aggregate([
        { $match: condition },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 }
          }
        }
      ]);
      let statusData = {
        pending: 0,
        inProgress: 0,
        completed: 0
      };
      if (getTaskStatusCount.length) {
        getTaskStatusCount.forEach((data) => {
          statusData[data._id] = data.count;
        });
      }
      responseHandler(res, statusCode._OK, messageString.task._GET_TASK_STATUS_COUNT_SUCCESS, statusData);
    } catch (err) {
      console.log("err =====get task status count catch==>>>", JSON.stringify(err, null, 2));
      responseHandler(res, statusCode._INTERNAL_ERROR, messageString.server._INTERNAL_SERVER_ERROR, {
        code: errorCode._INTERNAL_SERVER_ERROR
      });
    }
  }
};

module.exports = TaskController;
