import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const editUserRequestBodySchema = Joi.object()
  .keys({
    name: Joi.string(),
    role: Joi.string().valid("manager", "employee"),
  })
  .required()
  .options({ abortEarly: false });

export const validateEditUserRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validateUser = editUserRequestBodySchema.validate(req.body);
  if (validateUser.error) {
    return res.status(400).send({
      code: "BAD_REQUEST",
      errors: validateUser.error?.details.map((err) => err.message),
    });
  }
  next();
};
