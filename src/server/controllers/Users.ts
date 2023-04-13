import { Request, Response } from 'express';
import * as yup from 'yup';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { validation } from '../middlewares/Validation';
import { IUserProps } from '../interfaces';
import { queryEmail, saveUser } from '../database/repositories/Users';
import { StatusCodes } from 'http-status-codes';
import { errors } from '../utils/errorsMessages';

export const userValidation = validation((schema) =>
  schema<IUserProps>(
    yup.object().shape({
      name: yup.string().strict().min(3).trim().required(),
      email: yup.string().strict().email().trim().required(),
      password: yup.string().strict().min(3).trim().required()
    })
  )
);

export const save = async (req: Request, res: Response) => {
  const { name, email, password }: IUserProps = req.body;

  const emailValid = await queryEmail(email);

  if (emailValid) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: errors.emailAlreadyExists });
  }
  const passEncoded = await hash(password, 8);

  const userSaved = await saveUser({ name, email, password: passEncoded });

  return res.status(StatusCodes.CREATED).json(userSaved.id);
};

export const loginValidation = validation((schema) =>
  schema<Omit<IUserProps, 'name'>>(
    yup.object().shape({
      email: yup.string().strict().email().trim().required(),
      password: yup.string().strict().min(3).trim().required()
    })
  )
);

export const signin = async (req: Request, res: Response) => {
  const { email, password }: Omit<IUserProps, 'name'> = req.body;
  const emailValid = await queryEmail(email);

  if (!emailValid) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: errors.unauthorized });
  }

  const isPasswordValid = await compare(password, emailValid.password);

  if (!isPasswordValid)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: errors.unauthorized });

  if (!process.env.SECRET_KEY) throw new Error();

  const token = sign({ email: emailValid.email }, process.env.SECRET_KEY, {
    expiresIn: '3h'
  });

  const { password: _, ...user } = emailValid;
  req.user = user;

  return res.json({
    user: req.user,
    token
  });
};
