import { createClient } from "@/utils/supabase/server";

export async function createAnnouncement(body: {
    title: string;
    description: string;
    subtitle: string;
    body: string;
  }) {
    const supabase = await createClient();
    try {
      const { title, description, subtitle, body: announcementBody } = body;
  
      const { data, error } = await supabase
        .from("announcements")
        .insert([
          {
            title,
            description,
            subtitle,
            body: announcementBody,
          },
        ])
        .select();
  
      if (error) {
        throw new Error(error.message);
      }
  
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }