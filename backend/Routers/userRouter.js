import express from "express";
import { loginControllers, registerControllers, setAvatarController, allUsers } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerControllers);
router.post("/login", loginControllers);
router.post("/setAvatar/:id", setAvatarController);
router.get("/allUsers/:id", allUsers);  // ✅ Ensure this is a GET request

export default router;