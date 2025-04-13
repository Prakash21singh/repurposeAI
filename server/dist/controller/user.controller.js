"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const utils_1 = require("../utils");
const UserRepository = __importStar(require("../repositories/user.repository"));
class UserController {
    constructor() { }
    static Create_User(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const createdUser = yield UserRepository.createUser({
                    email: data.email,
                    name: data.name,
                    password: data.password,
                });
                res.json(utils_1.ResponseUtil.success(createdUser, "User created successfully!"));
            }
            catch (error) {
                res.json(utils_1.ResponseUtil.error("Something went wrong", 500));
            }
        });
    }
    static Update_User(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const updateUser = yield UserRepository.updateUser({
                    userId: data.id,
                    image: data.image,
                    name: data.name,
                });
                res.json(utils_1.ResponseUtil.success(updateUser, "User updated successfully!"));
            }
            catch (error) {
                console.error("Error:", error);
                res.json(utils_1.ResponseUtil.error("Something went wrong while updating user", 500));
            }
        });
    }
    static Get_User_Info(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const userInfo = yield UserRepository.getUserInfo(id);
                res.json(utils_1.ResponseUtil.success(userInfo, "Data fetched successfully!"));
            }
            catch (error) {
                console.error("Error:", error);
                res.json(utils_1.ResponseUtil.error("Something went wrong while deleting user", 500));
            }
        });
    }
}
exports.UserController = UserController;
