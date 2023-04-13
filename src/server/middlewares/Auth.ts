import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { queryEmail } from '../database/repositories/Users';
import { StatusCodes } from 'http-status-codes';
import { errors } from '../utils/errorsMessages';

export const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) throw new Error(`Invalid authorization header`);

  const token = authorization.split(' ')[1];

  const userPayload = verify(
    token,
    <string>process.env.SECRET_KEY
  ) as JwtPayload;

  const user = await queryEmail(userPayload.email);

  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: errors.userNotExists });
  }
  req.user = user;

  next();
};
