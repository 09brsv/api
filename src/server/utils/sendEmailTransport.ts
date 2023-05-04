import { transport } from '../database/config/Transport';
import { IFieldsFromSendEmail, IUserProps } from '../interfaces';

const { env } = process;

type TMessageSendEmail = {
  text: string;
  to: string;
  subject: string;
};

export const send = async (
  body: IFieldsFromSendEmail,
  user: Omit<IUserProps, 'password'>
): Promise<Error | TMessageSendEmail> => {
  const { to, subject, text } = body;
  const { name } = user;

  const msg = {
    to,
    subject: subject ? subject : 'Sem assunto',
    text
  };

  try {
    await transport.sendMail({ from: `${name} <${env.MAIL_USER}>`, ...msg });
    return msg;
  } catch (error) {
    const errMsg = error as Error;
    console.error(error);

    return errMsg;
  }
};
