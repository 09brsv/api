import { createTransport } from 'nodemailer';

const { env } = process;

export const transport = createTransport({
  host: env.MAIL_HOST,
  port: Number(env.MAIL_PORT),
  secure: true,
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASS
  }
});
