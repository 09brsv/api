import { IUser } from '../database/knex/models/interfaces';

declare global {
  namespace Express {
    interface Request {
      user: Partial<IUser>;
    }
  }
}
