"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.getUserInfo = getUserInfo;
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
function createUser(_a) {
    return __awaiter(this, arguments, void 0, function* ({ email, name, password }) {
        try {
            const salt = yield bcrypt_1.default.genSalt(14);
            const hash = yield bcrypt_1.default.hash(password, salt);
            const user = yield (prisma === null || prisma === void 0 ? void 0 : prisma.user.create({
                data: {
                    id: (0, uuid_1.v4)(),
                    email,
                    name,
                    password: hash,
                    subscription: {
                        create: {
                            id: (0, uuid_1.v4)(),
                        },
                    },
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            }));
            if (!user)
                throw new Error("User creation failed");
            return user;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error creating user" + error.message);
        }
    });
}
function updateUser(_a) {
    return __awaiter(this, arguments, void 0, function* ({ userId, name, image }) {
        try {
            const updatedUser = yield (prisma === null || prisma === void 0 ? void 0 : prisma.user.update({
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
            }));
            return updatedUser;
        }
        catch (error) {
            throw new Error("Error updating the user");
        }
    });
}
function getUserInfo(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userInfo = yield (prisma === null || prisma === void 0 ? void 0 : prisma.user.findFirst({
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
            }));
            return userInfo;
        }
        catch (error) {
            throw new Error("Error getting user info" + error.message);
        }
    });
}
