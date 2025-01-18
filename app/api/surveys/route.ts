import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// GET request to fetch surveys
export async function GET() {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("surveys")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// POST request to create a new survey
export async function POST(request: Request) {
    const supabase = await createClient();
    try {
      const body = await request.json();
      console.log("Request Body:", body); // Log the body for debugging
  
      const { data, error } = await supabase
        .from("surveys")
        .insert([body])
        .select();
  
      if (error) {
        console.error("Supabase Error:", error); // Log the error for debugging
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
  
      return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
      console.error("Server Error:", error); // Log the error for debugging
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }