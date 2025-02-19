import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const supabase = await createClient();

  // Get the current user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return redirect("/login");
  }

  // Fetch the user's role from the 'user-roles' table
  const { data: userRole, error: roleError } = await supabase
    .from("user-roles")
    .select("role_id")
    .eq("user_id", user.id)
    .single();

  if (roleError || !userRole) {
    return redirect("/error");
  }

  // Redirect based on the role_id
  switch (userRole.role_id) {
    case 1:
      return redirect("/user/dashboard");
    case 2:
      return redirect("/staff/dashboard");
    case 3:
      return redirect("/admin/dashboard");
    default:
      // If the role_id doesn't match any known roles, redirect to a default page or show an error
      return redirect("/error");
  }
}
