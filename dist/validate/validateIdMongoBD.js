"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateId = void 0;
const joi_1 = __importDefault(require("joi"));
const idUserSchema = joi_1.default.object().keys({
    id: joi_1.default.string().required().length(24),
});
const validateId = (req, res, next) => {
    var _a;
    const validateId = idUserSchema.validate(req.params);
    if (validateId.error) {
        return res.status(400).send({
            code: "BAD_REQUEST",
            errors: (_a = validateId.error) === null || _a === void 0 ? void 0 : _a.details.map((err) => err.message),
        });
    }
    next();
};
exports.validateId = validateId;
//# sourceMappingURL=validateIdMongoBD.js.map