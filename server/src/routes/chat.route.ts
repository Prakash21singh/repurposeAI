import express from "express";

const router = express.Router();

router.get("/:chatId");

router.get("/chats");

router.post("/create-chat");

router.delete("/:chatId");

export default router;
