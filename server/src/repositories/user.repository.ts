import { ICreateUser, IUpdateUser } from "../types";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { prisma } from "../lib/prisma";
export async function createUser({ email, password, name }: ICreateUser) {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser) throw new Error("User already exist with this email!");

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

export async function getMyProfile({ id }: { id: string }) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        image: true,
        name: true,
        email: true,
        subscription: true,
        credit: true,
      },
    });

    if (!user) throw new Error("Didn't get the user log please login again");

    return user;
  } catch (error: any) {
    console.error("Error:", error);
    throw new Error("Error finding the user's data");
  }
}

export async function verfiyUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) throw new Error("User not found with this ID");

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) throw new Error("Incorrect password. Try Again!");

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  } catch (error: any) {
    console.error("Error:", error);
    throw new Error(`Error while verifying the user` + error.message);
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
