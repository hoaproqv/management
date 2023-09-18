"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEditTaskRequest = void 0;
const joi_1 = __importDefault(require("joi"));
const editTaskRequestBodySchema = joi_1.default.object()
    .keys({
    name: joi_1.default.string(),
    description: joi_1.default.string(),
    status: joi_1.default.string().valid("pending", "working", "review", "done", "archive"),
    assignee: joi_1.default.string().length(24),
})
    .required()
    .options({ abortEarly: false });
const validateEditTaskRequest = (req, res, next) => {
    const validateTask = editTaskRequestBodySchema.validate(req.body);
    if (validateTask.error) {
        return res.status(400).send({
            code: "BAD_REQUEST",
            errors: validateTask.error.details.map((err) => err.message),
        });
    }
    next();
};
exports.validateEditTaskRequest = validateEditTaskRequest;
//# sourceMappingURL=validateEditTaskReq.js.map