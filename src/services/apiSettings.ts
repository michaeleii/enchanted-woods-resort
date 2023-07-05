import supabase from "./supabase";

async function getSettings() {
  const { data, error } = await supabase.from("setting").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return data;
}

export type SettingsData = Awaited<ReturnType<typeof getSettings>>;

// We expect a newSetting object that looks like {setting: newValue}
async function updateSetting(newSetting: { [field: string]: string }) {
  const { data, error } = await supabase
    .from("setting")
    .update(newSetting)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}

export { getSettings, updateSetting };
