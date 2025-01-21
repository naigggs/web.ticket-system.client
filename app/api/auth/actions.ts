"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { supabaseAdminClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error, data: authData } = await supabase.auth.signInWithPassword(
    data
  );

  if (error) {
    console.log("Login failed:", error);
    return; 
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: roleData, error: roleError } = await supabase
    .from("user-roles")
    .select("role_id")
    .eq("user_id", user.id)
    .single();

  if (roleError) {
    console.log("Error fetching role:", roleError);
    redirect("/auth/login");
  }

  revalidatePath("/", "layout");

  if (roleData.role_id === 3) {
    redirect("/admin/dashboard");
  } else {
    redirect("/user/dashboard");
  }
}

export async function signup(formData: FormData) {
  const supabase = supabaseAdminClient;

  const { data: signUpData, error } = await supabase.auth.admin.createUser({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    console.log("Error creating user:", error);
  }
  const { error: updateError } = await supabase.from("user-sign-up").update({
    status: "Accepted",
  }).eq('email', signUpData.user?.email);
  console.log(signUpData);
  if (updateError) {
    console.log("Error updating user status:", updateError);
  }
}

export async function declineUser(formData: FormData) {
  const supabase = supabaseAdminClient; 

  const { error: updateError } = await supabase.from("user-sign-up").update({
    status: "Declined",
  }).eq('email', formData.get("email") as string,);
  if (updateError) {
    console.log("Error updating user status:", updateError);
  }
}

export async function registerUser(formData: FormData) {
  const supabase = await createClient();
  const data = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    location: formData.get("location") as string,
    document1: formData.get("document1") as File,
    document2: formData.get("document2") as File,
  };

  const document1Upload = await supabase.storage
    .from("user_sign_up_attachments")
    .upload(`public/${data.email}/document1`, data.document1, { upsert: true });

  const document2Upload = await supabase.storage
    .from("user_sign_up_attachments")
    .upload(`public/${data.email}/document2`, data.document2, { upsert: true });

  if (document1Upload.error || document2Upload.error) {
    console.log(
      "Error uploading documents:",
      document1Upload.error || document2Upload.error
    );
    redirect("/error");
  }
  
  const document1Url = supabase.storage
    .from("user_sign_up_attachments")
    .getPublicUrl(`public/${data.email}/document1`)

  const document2Url = supabase.storage
    .from("user_sign_up_attachments")
    .getPublicUrl(`public/${data.email}/document2`)

  const { error } = await supabase.from("user-sign-up").insert({
    full_name: `${data.firstName} ${data.lastName}`,
    email: data.email,
    password: data.password,
    location: data.location,
    document_1: document1Url.data.publicUrl,
    document_2: document2Url.data.publicUrl,
    status: "Open",
  });

  if (error) {
    console.log("Error inserting user data:", error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/success");
}

