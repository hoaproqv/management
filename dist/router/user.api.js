"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const users_controller_1 = require("../controller/users.controller");
const validateCreateUserReq_1 = require("../validate/validateCreateUserReq");
const validateEditUserReq_1 = require("../validate/validateEditUserReq");
const validateIdMongoBD_1 = require("../validate/validateIdMongoBD");
router.get("/", users_controller_1.getUsers);
router.get("/:id/task", users_controller_1.getAllTasksOfUser);
router.post("/", validateCreateUserReq_1.validateCreateUserRequest, users_controller_1.createUser);
router.put("/:id", validateIdMongoBD_1.validateId, validateEditUserReq_1.validateEditUserRequest, users_controller_1.updateUser);
router.delete("/:id", validateIdMongoBD_1.validateId, users_controller_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.api.js.map