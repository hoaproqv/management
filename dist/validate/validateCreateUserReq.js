"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateUserRequest = void 0;
const joi_1 = __importDefault(require("joi"));
const createUserRequestBodySchema = joi_1.default.object()
    .keys({
    name: joi_1.default.string().required(),
    role: joi_1.default.string().valid("manager", "employee"),
})
    .required()
    .options({ abortEarly: false });
const validateCreateUserRequest = (req, res, next) => {
    const validateUser = createUserRequestBodySchema.validate(req.body);
    if (validateUser.error) {
        return res.status(400).send({
            code: "BAD_REQUEST",
            errors: validateUser.error.details.map((err) => err.message),
        });
    }
    next();
};
exports.validateCreateUserRequest = validateCreateUserRequest;
//# sourceMappingURL=validateCreateUserReq.js.map