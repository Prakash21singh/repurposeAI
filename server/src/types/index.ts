export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export interface IUpdateUser extends Pick<ICreateUser, "name"> {
  userId: string;
  image?: string;
}
