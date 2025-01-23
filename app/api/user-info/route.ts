import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("user-info")
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