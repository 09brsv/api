import { query } from '../config/Connection';
import { IEmail } from '../knex/models/interfaces';
import { ETableNames } from '../knex/tableNames';

export const saveEmail = async (data: object): Promise<void> =>
  await query(ETableNames.emails).insert(data);

export const getAll = async (id: number): Promise<IEmail[]> =>
  await query(ETableNames.emails).where({ id_user: id });
