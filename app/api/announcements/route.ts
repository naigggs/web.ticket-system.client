import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error:any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

import { NextResponse } from "next/server";
import { createAnnouncement } from "./actions";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await createAnnouncement(body);
    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}