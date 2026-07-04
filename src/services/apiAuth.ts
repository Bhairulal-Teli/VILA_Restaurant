import supabase, { supabaseUrl } from "./supabase";

interface SignupData {
  email: string;
  password: string;
  fullName: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface UpdateCurrentUserData {
  fullName?: string;
  password?: string;
  avatar?: File | null;
}

export async function signup({ email, password, fullName }: SignupData) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function login({ email, password }: LoginData) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ fullName, password, avatar }: UpdateCurrentUserData) {
  //1. Update password or username
  let userData;
  if (password) userData = { password };
  if (fullName) userData = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(userData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  //2. Upload the avatar images
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(error?.message);

  //3. Update the avatar
  const { data: updatedUserData, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);
  return updatedUserData;
}