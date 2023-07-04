import supabase from "./supabase";

async function login({ email, password }: { email: string; password: string }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error("There was an error logging in");
  }
  return data;
}

export { login };
