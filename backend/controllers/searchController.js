import supabase from "../config/supabase.js";

export const searchAll = async (req, res) => {
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
};
