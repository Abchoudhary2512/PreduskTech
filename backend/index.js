import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});


// Get profile by email
app.get("/profile/:email", async (req, res) => {
  const { email } = req.params;
  const { data, error } = await supabase
    .from("profiles")
    .select("*, skills(*), projects(*), work(*), links(*)")
    .eq("email", email)
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Create profile
app.post("/profile", async (req, res) => {
  const { name, email, education } = req.body;
  const { data, error } = await supabase
    .from("profiles")
    .insert([{ name, email, education }])
    .select()
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Update profile
app.put("/profile/:email", async (req, res) => {
  const { email } = req.params;
  const { name, education } = req.body;
  const { data, error } = await supabase
    .from("profiles")
    .update({ name, education })
    .eq("email", email)
    .select()
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});



// Get projects by skill
app.get("/projects", async (req, res) => {
  const { skill } = req.query;
  if (!skill) return res.status(400).json({ error: "Missing skill parameter" });

  const { data, error } = await supabase
    .from("projects")
    .select("*, profiles!inner(skills!inner(skill_name))")
    .filter("profiles.skills.skill_name", "ilike", `%${skill}%`);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});



app.get("/search", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Missing q parameter" });

  const results = {};

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .ilike("name", `%${q}%`);

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .ilike("title", `%${q}%`);

  const { data: skills } = await supabase
    .from("skills")
    .select("*")
    .ilike("skill_name", `%${q}%`);

  results.profiles = profiles || [];
  results.projects = projects || [];
  results.skills = skills || [];

  res.json(results);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
