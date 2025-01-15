import { createClient } from "@/utils/supabase/server";

interface Survey {
  id: number;
  title: string;
  created_at: string;
  [key: string]: any;
}

export async function GET(req: Request): Promise<Response> {
  const supabase = await createClient();
  const userId = req.headers.get("user-id");

  if (!userId) {
    return new Response(JSON.stringify({ error: "User ID is required." }), {
      status: 400,
    });
  }

  try {
    // Step 1: Fetch all survey IDs answered by the user
    const { data: answeredSurveys, error: answeredSurveysError } = await supabase
      .from("survey-responses")
      .select("survey_id")
      .eq("user_id", userId);

    if (answeredSurveysError) {
      console.error(answeredSurveysError);
      return new Response(JSON.stringify({ error: answeredSurveysError.message }), {
        status: 500,
      });
    }

    // Extract survey IDs of answered surveys
    const answeredSurveyIds = answeredSurveys?.map((response) => response.survey_id) || [];

    // Step 2: Fetch surveys not answered by the user
    const { data: unansweredSurveys, error: surveysError } = await supabase
      .from("surveys")
      .select("*")
      .not("id", "in", `(${answeredSurveyIds.join(",")})`)
      .order("created_at", { ascending: false });

    if (surveysError) {
      console.error(surveysError);
      return new Response(JSON.stringify({ error: surveysError.message }), {
        status: 500,
      });
    }

    // Return only unanswered surveys
    return new Response(JSON.stringify(unansweredSurveys), { status: 200 });
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
