import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import profileRoutes from "./routes/profileRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Routes
app.use("/profile", profileRoutes);
app.use("/projects", projectRoutes);
app.use("/search", searchRoutes);

export default app;
