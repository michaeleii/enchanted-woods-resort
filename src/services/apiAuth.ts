import supabase, { supabaseUrl } from "./supabase";

async function signup({
  full_name,
  email,
  password,
}: {
  full_name: string;
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name, avatar: "" },
    },
  });
  if (error) {
    throw new Error("There was an error signing up");
  }
  return data;
}

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

export type CurrentUser = Awaited<ReturnType<typeof getCurrentUser>>;

async function updateCurrentUser({
  password,
  full_name,
  avatar,
}: {
  password?: string;
  full_name?: string;
  avatar?: File | null;
}) {
  let updateData = {};
  if (password) updateData = { password };
  if (full_name) updateData = { data: { full_name } };
  //1. Update password or full_name
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;
  //2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);
  //3. Update the avatar in the user
  const { data: updatedUser, error: avatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (avatarError) throw new Error(avatarError.message);
  return updatedUser;
}

async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export { signup, login, getCurrentUser, logout, updateCurrentUser };
