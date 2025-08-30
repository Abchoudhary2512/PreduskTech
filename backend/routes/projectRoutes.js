import express from "express";
import { getProjectsBySkill } from "../controllers/projectController.js";

const router = express.Router();

router.get("/", getProjectsBySkill);

export default router;
