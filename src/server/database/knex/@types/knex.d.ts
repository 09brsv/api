declare module 'knex/types/tables' {
  interface User {
    id: number;
    name: string;
    email: string;
    password: string;
  }
  interface Email {
    id: number;
    body: string;
    email: string;
    subject: string;
    date: Date;
    user_id: number;
  }
}

interface Tables {
  users: User;
  emails: Email;
}
