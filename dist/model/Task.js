"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    status: {
        type: String,
        require: true,
        enum: ["pending", "working", "review", "done", "archive"],
    },
    assignee: { type: String, require: true },
    isDeleted: Boolean,
}, {
    timestamps: true,
});
const Task = mongoose_1.default.model("Task", taskSchema);
exports.default = Task;
//# sourceMappingURL=Task.js.map