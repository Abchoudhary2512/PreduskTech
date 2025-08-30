import supabase from "../config/supabase.js";

export const getProjectsBySkill = async (req, res) => {
  const { skill } = req.query;
  if (!skill) return res.status(400).json({ error: "Missing skill parameter" });

  const { data, error } = await supabase
    .from("projects")
    .select("*, profiles!inner(skills!inner(skill_name))")
    .filter("profiles.skills.skill_name", "ilike", `%${skill}%`);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};
