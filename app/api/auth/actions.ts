"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error, data: authData } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log("Login failed:", error);
    return; // Exit the function if there's an error
  }

  // Get the current user
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Fetch the user's role_id from the user-roles table
  const { data: roleData, error: roleError } = await supabase
    .from('user-roles')
    .select('role_id')
    .eq('user_id', user.id)
    .single();

  if (roleError) {
    console.log("Error fetching role:", roleError);
    redirect('/auth/login');
  }

  revalidatePath("/", "layout");

  // Redirect based on role_id
  if (roleData.role_id === 3) {
    redirect("/admin/dashboard");
  } else {
    redirect("/user/dashboard");
  }
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
