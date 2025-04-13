"use strict";
// prisma-client.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const prisma_1 = require("../../generated/prisma");
class PrismaClientSingleton {
    constructor() { }
    static getInstance() {
        if (!PrismaClientSingleton.instance) {
            if (process.env.NODE_ENV === "development") {
                if (!global.prisma) {
                    global.prisma = new prisma_1.PrismaClient();
                }
                PrismaClientSingleton.instance = global.prisma;
            }
            else {
                PrismaClientSingleton.instance = new prisma_1.PrismaClient();
            }
        }
        return PrismaClientSingleton.instance;
    }
}
exports.prisma = PrismaClientSingleton.getInstance();
