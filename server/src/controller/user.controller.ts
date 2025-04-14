import { Request, Response } from "express";
import { ResponseUtil } from "../utils";
import * as UserRepository from "../repositories/user.repository";

export class UserController {
  constructor() {}

  static async Create_User(req: Request, res: Response) {
    try {
      const data = req.body;

      const createdUser = await UserRepository.createUser({
        email: data.email,
        password: data.password,
      });

      res.json(ResponseUtil.success(createdUser, "User created successfully!"));
    } catch (error) {
      res.json(ResponseUtil.error("Something went wrong", 500));
    }
  }

  static async Login_user(req: Request, res: Response) {
    try {
      const data = req.body;

      const user = await UserRepository.verfiyUser({
        email: data.email,
        password: data.password,
      });

      res.json(ResponseUtil.success(user, "User verification successfully!"));
    } catch (error: any) {
      res.json(ResponseUtil.error("Something went wrong", 500));
    }
  }

  static async Update_User(req: Request, res: Response) {
    try {
      const data = req.body;

      const updateUser = await UserRepository.updateUser({
        userId: data.id,
        image: data.image,
        name: data.name,
      });

      res.json(ResponseUtil.success(updateUser, "User updated successfully!"));
    } catch (error: any) {
      console.error("Error:", error);
      res.json(
        ResponseUtil.error("Something went wrong while updating user", 500)
      );
    }
  }

  static async Get_User_Info(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const userInfo = await UserRepository.getUserInfo(id);

      res.json(ResponseUtil.success(userInfo, "Data fetched successfully!"));
    } catch (error: any) {
      console.error("Error:", error);
      res.json(
        ResponseUtil.error("Something went wrong while deleting user", 500)
      );
    }
  }
}
