export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface IAuthUser {
  email: string;
  password: string;
}

export interface IEmail {
  id: number;
  body: string;
  email: string;
  subject: string;
  date: Date;
  user_id: number;
}
