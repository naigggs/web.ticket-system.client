"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ClosedTable  } from "./closed-table";
import { ClosedModal } from "./closed-modal";
import { Tickets } from "../a-dashboard/types";

export default function ClosedPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<Tickets | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tickets, setTickets] = useState<Tickets[]>([]);
  const [error, setError] = useState("");
  
  // fetch tickets from supabase
  useEffect(() => {
    async function fetchTickets() {
      try {
        const response = await fetch("/api/tickets");
        if (!response.ok) {
          throw new Error("Failed to fetch tickets");
        }
        const data = await response.json();
        setTickets(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    }

    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter((ticket) =>
    ticket.title.toLowerCase().includes(searchQuery.toLowerCase())
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
                (ticket) => ticket.status === "Closed"
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