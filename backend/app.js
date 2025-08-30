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


SUPABASE_URL=https://qggvnrigidnvnxwpjsid.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnZ3ZucmlnaWRudm54d3Bqc2lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0ODgwOTcsImV4cCI6MjA3MjA2NDA5N30.BFezzUx_9NL-m8s5HjnpqhvxEIqP3AByJNSSjxcFUR0
PORT=5000
