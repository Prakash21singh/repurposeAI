// In your router file
import { Router } from "express";
import { UserController } from "../controller/user.controller";

const router = Router();

// This is user route { coming at /api/user}
router.get("/", UserController.Get_User_Info);
router.post("/login", UserController.Login_user);
router.post("/register", UserController.Create_User);
router.put("/:userId", UserController.Update_User);

export default router;
