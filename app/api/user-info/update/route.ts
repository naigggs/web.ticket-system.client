import { NextResponse } from "next/server";
import { supabaseAdminClient } from "@/utils/supabase/admin";

export async function PUT(request: Request) {
  try {
    const { userId, full_name, location, document_1, document_2 } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const { error: updateError } = await supabaseAdminClient
      .from("user-info")
      .update({ full_name, location, document_1, document_2 })
      .eq("user_id", userId);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the user" },
      { status: 500 }
    );
  }
}