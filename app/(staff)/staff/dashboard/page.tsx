"use client";

import { createClient } from "@/utils/supabase/client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Ticket {
  id: string;
  title: string;
  // Add other fields as necessary
}

export default function StaffDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const fetchTickets = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("tickets")
        .select("*")
        .eq("assignee_id", user?.id);
      if (error) {
        throw error;
      }
      setTickets(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <>
      {tickets.map((ticket) => (
        <Card key={ticket.id} className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle>
              <span className="text-lg font-semibold truncate">{ticket.title}</span>
              <Badge>{ticket.priority}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mt-4">
              <Badge>{ticket.ticket_status}</Badge>
              <span className="text-xs text-gray-500">Assigned: John Doe</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
