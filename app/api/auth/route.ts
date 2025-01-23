import { createClient } from "@/utils/supabase/server";
import { supabaseAdminClient } from "@/utils/supabase/admin";

export async function GET(req: Request) {
  const supabase = supabaseAdminClient;

  const { data: { users }, error } = await supabase.auth.admin.listUsers()
  console.log(users)

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(users), { status: 200 });
}
