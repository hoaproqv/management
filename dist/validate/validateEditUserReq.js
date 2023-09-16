"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEditUserRequest = void 0;
const joi_1 = __importDefault(require("joi"));
const editUserRequestBodySchema = joi_1.default.object()
    .keys({
    name: joi_1.default.string(),
    role: joi_1.default.string().valid("manager", "employee"),
})
    .required()
    .options({ abortEarly: false });
const validateEditUserRequest = (req, res, next) => {
    var _a;
    const validateUser = editUserRequestBodySchema.validate(req.body);
    if (validateUser.error) {
        return res.status(400).send({
            code: "BAD_REQUEST",
            errors: (_a = validateUser.error) === null || _a === void 0 ? void 0 : _a.details.map((err) => err.message),
        });
    }
    next();
};
exports.validateEditUserRequest = validateEditUserRequest;
//# sourceMappingURL=validateEditUserReq.js.map