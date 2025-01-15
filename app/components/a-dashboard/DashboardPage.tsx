"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { tickets, Ticket } from "@/app/data/a-dash";
import { Input } from "@/components/ui/input";
import { TaskColumn } from "@/app/components/a-dashboard/TaskColumn";
import { TicketModal } from "@/app/components/a-dashboard/TicketModal";
import { Tickets } from "./types.js";

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
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

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  return (
    <div className="mx-auto justify-center px-2 md:px-10 my-6 animate-in fade-in slide-in-from-bottom-8 duration-300">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          Task Board
        </h1>
        <div className="relative w-40 md:w-64 h-10">
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-full pl-10 pr-4 py-2 text-sm placeholder:text-gray-500 focus:ring-1"
            placeholder="Search tickets"
          />
          <Search className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <TaskColumn
          title="To Do"
          tickets={filteredTickets.filter((ticket) => ticket.status === "Open")}
          status="todo"
          onTicketClick={handleTicketClick}
          isFirstColumn
        />
        <TaskColumn
          title="In Progress"
          tickets={filteredTickets.filter(
            (ticket) => ticket.status === "In Progress"
          )}
          status="inprogress"
          onTicketClick={handleTicketClick}
        />
        <TaskColumn
          title="On Hold"
          tickets={filteredTickets.filter(
            (ticket) => ticket.status === "On Hold"
          )}
          status="onhold"
          onTicketClick={handleTicketClick}
        />
        <TaskColumn
          title="Done"
          tickets={filteredTickets.filter((ticket) => ticket.status === "Closed")}
          status="done"
          onTicketClick={handleTicketClick}
          isLastColumn
        />
      </div>

      <TicketModal
        isOpen={isModalOpen}
        onClose={closeModal}
        ticket={selectedTicket}
      />
    </div>
  );
}