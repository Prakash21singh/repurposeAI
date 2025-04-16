import express from "express";

const router = express.Router();

router.get("/user-actions/:chatId");

router.post("/action/:chatId");
