"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TaskCard } from "./task-card";
import { TicketModal } from "./ticket-modal";
import { Tickets } from "./types.js";

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<Tickets | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tickets, setTickets] = useState<Tickets[]>([]);
  const [error, setError] = useState("");

  // Fetch tickets from Supabase
  const fetchTickets = async () => {
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
  };

  // Fetch tickets on initial load
  useEffect(() => {
    fetchTickets();
  }, []);

  // Filter tickets by ID
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

  const handleStatusUpdate = async () => {
    await fetchTickets();
  };

  return (
    <div className="mx-auto justify-center px-2 md:px-10 my-6 animate-in fade-in slide-in-from-bottom-8 duration-300">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl md:text-2xl flex items-center font-bold text-center">
          Task Board
        </h2>
        <div className="relative w-40 md:w-64 h-10">
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 py-2 text-sm placeholder:text-gray-500 focus-visible:ring-0"
            placeholder="Search tickets by ID"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <TaskCard
          title="To Do"
          tickets={filteredTickets.filter(
            (ticket) => ticket.ticket_status === "Open"
          )}
          status="todo"
          onTicketClick={handleTicketClick}
          isFirstColumn
        />
        <TaskCard
          title="In Progress"
          tickets={filteredTickets.filter(
            (ticket) => ticket.ticket_status === "In Progress"
          )}
          status="inprogress"
          onTicketClick={handleTicketClick}
        />
        <TaskCard
          title="On Hold"
          tickets={filteredTickets.filter(
            (ticket) => ticket.ticket_status === "On Hold"
          )}
          status="onhold"
          onTicketClick={handleTicketClick}
        />
      </div>

      <TicketModal
        isOpen={isModalOpen}
        onClose={closeModal}
        ticket={selectedTicket}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
}