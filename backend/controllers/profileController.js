import supabase from "../config/supabase.js";

export const getProfileByEmail = async (req, res) => {
  const { email } = req.params;
  const { data, error } = await supabase
    .from("profiles")
    .select("*, skills(*), projects(*), work(*), links(*)")
    .eq("email", email)
    .single();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const createProfile = async (req, res) => {
  const { name, email, education } = req.body;
  const { data, error } = await supabase
    .from("profiles")
    .insert([{ name, email, education }])
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const updateProfile = async (req, res) => {
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
};
