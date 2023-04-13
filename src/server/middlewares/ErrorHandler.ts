import { NextFunction, Request, Response } from 'express';
import { errors } from '../utils/errorsMessages';

export const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(err);

  return res.status(500).json({ message: errors.serverError });
};
