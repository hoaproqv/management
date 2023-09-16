"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const tasks_controller_1 = require("../controller/tasks.controller");
const validateIdMongoBD_1 = require("../validate/validateIdMongoBD");
const validateCreateTaskReq_1 = require("../validate/validateCreateTaskReq");
const validateEditTaskReq_1 = require("../validate/validateEditTaskReq");
router.get("/", tasks_controller_1.getTasks);
router.get("/:id", validateIdMongoBD_1.validateId, tasks_controller_1.getTaskById);
router.post("/", validateCreateTaskReq_1.validateCreateTaskRequest, tasks_controller_1.createTask);
router.put("/:id", validateIdMongoBD_1.validateId, validateEditTaskReq_1.validateEditTaskRequest, tasks_controller_1.updateTask);
router.delete("/:id", validateIdMongoBD_1.validateId, tasks_controller_1.deleteTask);
exports.default = router;
//# sourceMappingURL=task.api.js.map