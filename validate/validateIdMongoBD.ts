import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const idUserSchema = Joi.object().keys({
  id: Joi.string().required().length(24),
});

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const validateId = idUserSchema.validate(req.params);
  if (validateId.error) {
    return res.status(400).send({
      code: "BAD_REQUEST",
      errors: validateId.error?.details.map((err) => err.message),
    });
  }
  next();
};
