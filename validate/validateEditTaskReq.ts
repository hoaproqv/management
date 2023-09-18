import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const editTaskRequestBodySchema = Joi.object()
  .keys({
    name: Joi.string(),
    description: Joi.string(),
    status: Joi.string().valid(
      "pending",
      "working",
      "review",
      "done",
      "archive",
    ),
    assignee: Joi.string().length(24),
  })
  .required()
  .options({ abortEarly: false });

export const validateEditTaskRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validateTask = editTaskRequestBodySchema.validate(req.body);
  if (validateTask.error) {
    return res.status(400).send({
      code: "BAD_REQUEST",
      errors: validateTask.error.details.map((err) => err.message),
    });
  }
  next();
};
