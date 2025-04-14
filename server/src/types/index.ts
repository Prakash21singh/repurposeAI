export interface ICreateUser {
  email: string;
  password: string;
}

export interface IUpdateUser {
  userId: string;
  name?: string;
  image?: string;
}
