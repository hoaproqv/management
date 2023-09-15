import express from "express";
const router = express.Router();
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controller/tasks.controller";
import { validateId } from "../validate/validateIdMongoBD";
import { validateCreateTaskRequest } from "../validate/validateCreateTaskReq";
import { validateEditTaskRequest } from "../validate/validateEditTaskReq";

router.get("/", getTasks);

router.get("/:id", validateId, getTaskById);

router.post("/", validateCreateTaskRequest, createTask);

router.put("/:id", validateId, validateEditTaskRequest, updateTask);

router.delete("/:id", validateId, deleteTask);

export default router;
