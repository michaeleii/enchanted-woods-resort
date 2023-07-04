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

async function getCurrentUser() {
  const { data } = await supabase.auth.getSession();
  if (!data.session) return null;
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return user;
}

async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export { login, getCurrentUser, logout };
