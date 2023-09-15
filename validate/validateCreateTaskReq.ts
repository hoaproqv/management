import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const createTaskRequestBodySchema = Joi.object()
  .keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string()
      .required()
      .valid("pending", "working", "review", "done", "archive"),
    assignee: Joi.string().length(24),
  })
  .required()
  .options({ abortEarly: false });

export const validateCreateTaskRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validateTask = createTaskRequestBodySchema.validate(req.body);
  if (validateTask.error) {
    return res.status(400).send({
      code: "BAD_REQUEST",
      errors: validateTask.error.details.map((err) => err.message),
    });
  }
  next();
};
