import sgMail, { ResponseError } from '@sendgrid/mail';

import { IFieldsFromSendEmail, IUserProps } from '../interfaces';

const { env } = process;
sgMail.setApiKey(<string>env.MAIL_PASS);

type TMessageSendEmail = {
  from: string;
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
    from: `${name} <devbrunobatista@gmail.com>`,
    to,
    subject: subject ?? 'Sem assunto',
    text
  };

  (async () => {
    try {
      await sgMail.send(msg);
    } catch (error) {
      const err = error as ResponseError;
      const errMsg = error as Error;
      console.error(error);

      if (err.response) {
        console.error(err.response.body);
        return err.response.body;
      }
      return errMsg.message;
    }
  })();
  return msg;
};
