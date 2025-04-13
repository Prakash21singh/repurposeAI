// prisma-client.ts

import { PrismaClient } from "../../generated/prisma";

declare global {
  var prisma: PrismaClient | undefined;
}

class PrismaClientSingleton {
  private static instance: PrismaClient;

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!PrismaClientSingleton.instance) {
      if (process.env.NODE_ENV === "development") {
        if (!global.prisma) {
          global.prisma = new PrismaClient();
        }
        PrismaClientSingleton.instance = global.prisma;
      } else {
        PrismaClientSingleton.instance = new PrismaClient();
      }
    }

    return PrismaClientSingleton.instance;
  }
}

export const prisma = PrismaClientSingleton.getInstance();
