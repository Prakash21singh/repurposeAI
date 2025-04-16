export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export interface IUpdateUser {
  userId: string;
  name?: string;
  image?: string;
}
