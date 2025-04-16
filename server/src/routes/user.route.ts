// In your router file
import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// This is user route { coming at /api/user}
router.get("/me", authMiddleware, UserController.Get_My_Profile);
router.post("/login", UserController.Login_user);
router.post("/register", UserController.Create_User);
router.get("/:id", UserController.Get_User_Info);
router.put("/:userId", UserController.Update_User);

export default router;
