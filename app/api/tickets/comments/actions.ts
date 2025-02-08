"use server";

import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

interface AddCommentParams {
  ticket_id: string;
  comment: string;
}

export async function addComment({ ticket_id, comment }: AddCommentParams) {
  const supabase = await createClient();
  const headersList = await headers();
  const userId = headersList.get("user-id");
  const { data, error } = await supabase
    .from("ticket-comments")
    .insert([
      {
        user_id: userId,
        ticket_id,
        comment,
      },
    ])
    .select();

  if (error) {
    console.error("Error adding comment:", error);
    throw new Error("Failed to add comment");
  }

  return data;
}
