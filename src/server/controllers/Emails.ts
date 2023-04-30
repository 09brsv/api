import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';

import { IFieldsFromSendEmail } from '../interfaces';
import { validation } from '../middlewares/Validation';
import { send } from '../utils/sendEmail';
import { getAll, saveEmail } from '../database/repositories/Email';

type TUserSender = {
  name: string;
  email: string;
};

export const fieldsSendEmailValidation = validation((schema) =>
  schema<IFieldsFromSendEmail>(
    yup.object({
      from: yup.object().optional(),
      to: yup.string().email().required(),
      subject: yup.string().optional(),
      text: yup.string().required()
    })
  )
);

export const sendOneEmail = async (req: Request, res: Response) => {
  const result = await send(req.body, req.user as TUserSender);

  if (result instanceof Error) {
    return res.status(StatusCodes.BAD_REQUEST).json(result);
  }
  const { text: body, to: email, subject } = result;

  await saveEmail({
    body,
    email,
    subject,
    date: new Date(),
    id_user: req.user.id
  });
  res.status(StatusCodes.CREATED).json({ message: 'Email sent successfully' });
};

export const getEmails = async (req: Request, res: Response) => {
  if (!req.user.id) throw new Error();

  const emails = await getAll(req.user.id);
  const dataEmailsChanged = emails.map((email) => {
    return {
      ...email,
      date: `${email.date.getDate()}/${
        email.date.getMonth() + 1
      }/${email.date.getFullYear()}`
    };
  });
  return res.json(dataEmailsChanged);
};
