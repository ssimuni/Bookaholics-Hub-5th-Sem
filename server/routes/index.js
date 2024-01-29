import { Router } from "express";
import UserRoutes from "./userRoutes.js";

const router = new Router();
router.use("/api/user",UserRoutes);

export default router;


