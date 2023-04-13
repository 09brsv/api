import { IUserProps } from '../../interfaces';
import { query } from '../config/Connection';
import { ETableNames } from '../knex/tableNames';
import { IUser } from '../knex/models/interfaces';

export const queryEmail = async (email: string): Promise<IUser | undefined> => {
  const isUserValid: IUser = await query(ETableNames.users)
    .where({ email })
    .first();

  return isUserValid;
};

export const saveUser = async (user: IUserProps): Promise<IUser> => {
  const newUser = await query(ETableNames.users).insert(user).returning('*');
  return newUser[0];
};
