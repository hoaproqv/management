"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_api_1 = __importDefault(require("../router/user.api"));
const task_api_1 = __importDefault(require("../router/task.api"));
router.use("/users", user_api_1.default);
router.use("/tasks", task_api_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map