import mongoose from "mongoose";
const taskSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    description: { type: String, require: true },
    status: {
      type: String,
      require: true,
      enum: ["pending", "working", "review", "done", "archive"],
    },
    assignee: { type: String, require: true },
    isDeleted: Boolean,
  },
  {
    timestamps: true,
  },
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
