import express from "express";
import { infoAllUser, infoUserByiD, registerUser } from "../controllers/user.controller";

const router = express.Router();

router.get("/", infoAllUser);

router.get("/:id", infoUserByiD);

router.post("/", registerUser);

export default router;
