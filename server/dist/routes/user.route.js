"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// In your router file
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const router = (0, express_1.Router)();
// This is user route { coming at /api/user}
router.get("/", user_controller_1.UserController.Get_User_Info);
router.post("/", user_controller_1.UserController.Create_User);
router.put("/:userId", user_controller_1.UserController.Update_User);
exports.default = router;
