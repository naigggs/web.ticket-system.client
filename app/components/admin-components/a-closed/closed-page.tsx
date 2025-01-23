"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ClosedTable  } from "./closed-table";
import { ClosedModal } from "./closed-modal";
import { Tickets } from "../a-taskboard/types";
import { createClient } from "@/utils/supabase/client";


export default function ClosedPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<Tickets | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tickets, setTickets] = useState<Tickets[]>([]);
  const [error, setError] = useState("");
  const supabase = createClient();
  
  
  // fetch tickets from supabase
  const fetchTickets = async () => {
    try {
      const { data, error } = await supabase.from("tickets").select("*");
      if (error) {
        throw error;
      }
      setTickets(data || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
  };

  useEffect(() => {
    // Fetch tickets on initial load
    fetchTickets();

    // Set up real-time subscription
    const subscription = supabase
      .channel("tickets-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tickets" },
        (payload) => {
          switch (payload.eventType) {
            case "INSERT":
              setTickets((prev) => [payload.new as Tickets, ...prev]); // Prepend the new ticket
              break;
            case "UPDATE":
              setTickets((prev) =>
                prev.map((ticket) =>
                  ticket.id === payload.new.id ? (payload.new as Tickets) : ticket
                )
              );
              break;
            case "DELETE":
              setTickets((prev) =>
                prev.filter((ticket) => ticket.id !== payload.old.id)
              );
              break;
          }
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const filteredTickets = tickets.filter((ticket) =>
    ticket.id?.toString().includes(searchQuery)
  );

  const handleTicketClick = (ticket: Tickets) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  return (
    <div className="mx-auto justify-center px-2 md:px-10 my-6 animate-in fade-in slide-in-from-bottom-8 duration-300">

      <div>
        <ClosedTable
            title="Closed"
            tickets={filteredTickets.filter(
                (ticket) => ticket.ticket_status === "Closed"
            )}
            status="onhold"
            onTicketClick={handleTicketClick}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            />
      </div>

      <ClosedModal
        isOpen={isModalOpen}
        onClose={closeModal}
        ticket={selectedTicket}
      />
    </div>
  );
}