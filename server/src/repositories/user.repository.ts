import { ICreateUser, IUpdateUser } from "../types";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function createUser({ email, name, password }: ICreateUser) {
  try {
    const salt = await bcrypt.genSalt(14);
    const hash = await bcrypt.hash(password, salt);
    const user = await prisma?.user.create({
      data: {
        id: uuid(),
        email,
        name,
        password: hash,
        subscription: {
          create: {
            id: uuid(),
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) throw new Error("User creation failed");

    return user;
  } catch (error: any) {
    console.log(error);
    throw new Error("Error creating user" + error.message);
  }
}

export async function updateUser({ userId, name, image }: IUpdateUser) {
  try {
    const updatedUser = await prisma?.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        image,
      },
      select: {
        id: true,
        name: true,
        image: true,
      },
    });

    return updatedUser;
  } catch (error) {
    throw new Error("Error updating the user");
  }
}

export async function getUserInfo(userId: string) {
  try {
    const userInfo = await prisma?.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        image: true,
        name: true,
        email: true,
        subscription: true,
      },
    });

    return userInfo;
  } catch (error: any) {
    throw new Error("Error getting user info" + error.message);
  }
}
