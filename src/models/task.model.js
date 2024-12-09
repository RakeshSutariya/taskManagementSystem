const mongoose = require("mongoose");

const { taskStatus } = require("../const/enum");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    dueDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: Object.values(taskStatus),
      default: taskStatus.PENDING
    },
    userId: {
      type: mongoose.Types.ObjectId
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const TaskModel = mongoose.model("taskMaster", taskSchema, "taskMaster");

module.exports = TaskModel;
