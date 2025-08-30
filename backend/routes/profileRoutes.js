import express from "express";
import { getProfileByEmail, createProfile, updateProfile } from "../controllers/profileController.js";

const router = express.Router();

router.get("/:email", getProfileByEmail);
router.post("/", createProfile);
router.put("/:email", updateProfile);

export default router;
