import express from "express";
const router = express.Router();
import {
  createUser,
  getUsers,
  getAllTasksOfUser,
  updateUser,
  deleteUser,
} from "../controller/users.controller";
import { validateCreateUserRequest } from "../validate/validateCreateUserReq";
import { validateEditUserRequest } from "../validate/validateEditUserReq";
import { validateId } from "../validate/validateIdMongoBD";

router.get("/", getUsers);

router.get("/:id", getAllTasksOfUser);

router.post("/", validateCreateUserRequest, createUser);

router.put("/:id", validateId, validateEditUserRequest, updateUser);

router.delete("/:id", validateId, deleteUser);

export default router;
