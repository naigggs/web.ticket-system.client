import { NextResponse } from "next/server";
import { supabaseAdminClient } from "@/utils/supabase/admin";

export async function DELETE(request: Request) {

  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const { error: userInfoError } = await supabaseAdminClient
      .from("user-info")
      .delete()
      .eq("user_id", userId);

    if (userInfoError) {
      throw userInfoError;
    }

    const { error: authError } = await supabaseAdminClient.auth.admin.deleteUser(userId);

    if (authError) {
      throw authError;
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the user" },
      { status: 500 }
    );
  }
}