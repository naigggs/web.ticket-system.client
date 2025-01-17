// /app/api/subscribe-tickets/route.ts

import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  const supabase = await createClient();

  // Get the user ID from the headers
  const userId = req.headers.get("user-id");

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized: user-id is missing from headers" },
      { status: 401 }
    );
  }

  const subscription = supabase
    .channel("public:tickets")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "tickets" },
      (payload) => {
        const updatedTicket = payload.new;
        const oldTicket = payload.old;

        if (
          updatedTicket.ticket_status !== oldTicket.ticket_status &&
          updatedTicket.user_id === userId
        ) {
          // Send notification for the updated ticket status
          return NextResponse.json({
            id: updatedTicket.id,
            message: `Ticket #${updatedTicket.id} status changed to ${updatedTicket.ticket_status}`,
          });
        }
      }
    )
    .subscribe();

  return NextResponse.json({ message: "Subscribed to ticket updates" });
}
