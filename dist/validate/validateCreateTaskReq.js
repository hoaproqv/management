"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateTaskRequest = void 0;
const joi_1 = __importDefault(require("joi"));
const createTaskRequestBodySchema = joi_1.default.object()
    .keys({
    name: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    status: joi_1.default.string()
        .required()
        .valid("pending", "working", "review", "done", "archive"),
    assignee: joi_1.default.string().length(24),
})
    .required()
    .options({ abortEarly: false });
const validateCreateTaskRequest = (req, res, next) => {
    const validateTask = createTaskRequestBodySchema.validate(req.body);
    if (validateTask.error) {
        return res.status(400).send({
            code: "BAD_REQUEST",
            errors: validateTask.error.details.map((err) => err.message),
        });
    }
    next();
};
exports.validateCreateTaskRequest = validateCreateTaskRequest;
//# sourceMappingURL=validateCreateTaskReq.js.map