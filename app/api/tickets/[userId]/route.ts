import { createClient } from "@/utils/supabase/server";

interface Ticket {
  id: number;
  user_id: string;
  created_at: string;
  [key: string]: any;
}

interface RouteParams {
  params: {
    userId: string;
  };
}

export async function GET(
  req: Request,
  { params }: RouteParams
): Promise<Response> {
  const supabase = await createClient();
  const { userId } = params;

  if (!userId) {
    return new Response(JSON.stringify({ error: "User ID is required." }), {
      status: 400,
    });
  }

  try {
    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .eq("user_id", userId)
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
