import { IUser } from '../database/knex/models/interfaces';

export interface IUserProps {
  name: string;
  email: string;
  password: string;
}

export interface IFieldsFromSendEmail {
  from?: Partial<IUser>;
  to: string;
  subject?: string;
  text: string;
}
