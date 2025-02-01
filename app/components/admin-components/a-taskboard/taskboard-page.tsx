"use client";

import React, { useState, useEffect } from "react";
import { Search, Ticket } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TaskCard } from "./task-card";
import { TicketModal } from "./ticket-modal";
import { Tickets } from "./types.js";
import { createClient } from "@/utils/supabase/client";
import { TicketDone} from "./ticket-done";
import { TicketStatus } from "./ticket-status";

export default function TaskBoardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<Tickets | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tickets, setTickets] = useState<Tickets[]>([]);
  const [error, setError] = useState("");

  const supabase = createClient();

  // Fetch tickets from Supabase
  const fetchTickets = async () => {
    try {
      const { data, error } = await supabase.from("tickets").select(`*, assignee_id(*)`).order("created_at", { ascending: false });
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
    fetchTickets();
    const subscription = supabase
      .channel("tickets-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tickets" },
        (payload) => {
          switch (payload.eventType) {
            case "INSERT":
              setTickets((prev) => [payload.new as Tickets, ...prev]);
              break;
              case "UPDATE":
                setTickets((prev) =>
                  prev.map((ticket) =>
                    ticket.id === payload.new.id
                      ? { ...ticket, ...payload.new }
                      : ticket
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
      <div className="flex justify-between  mb-4">
        <h2 className="text-xl md:text-2xl flex items-center font-bold text-center">
          Tickets
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex flex-col  gap-3">
          <div className="px-4 py-2 bg-green-300 rounded-2xl font-bold">
            Open
          </div>
          <TaskCard
            title="To Do"
            tickets={filteredTickets.filter(
              (ticket) => ticket.ticket_status === "Open"
            )}
            status="todo"
            onTicketClick={handleTicketClick}
            isFirstColumn
          />
        </div>

        <div className="flex flex-col  gap-3">
          <div className="px-4 py-2 bg-blue-300 rounded-2xl font-bold">
            In Progress
          </div>
          <TaskCard
            title="In Progress"
            tickets={filteredTickets.filter(
              (ticket) => ticket.ticket_status === "In Progress"
            )}
            status="inprogress"
            onTicketClick={handleTicketClick}
          />
        </div>
        <div className="flex flex-col  gap-3">
          <div className="px-4 py-2 bg-red-400 rounded-2xl font-bold">
            On Hold
          </div>
          <TaskCard
            title="On Hold"
            tickets={filteredTickets.filter(
              (ticket) => ticket.ticket_status === "On Hold"
            )}
            status="onhold"
            onTicketClick={handleTicketClick}
          />
        </div>
        <div className="flex flex-col  gap-3">
          <div className="px-4 py-2 bg-yellow-400 rounded-2xl font-bold">
           Charts
          </div>
            <TicketDone />
            <TicketStatus />
        </div>
      </div>
      <TicketModal
        isOpen={isModalOpen}
        onClose={closeModal}
        ticket={selectedTicket}
      />
    </div>
  );
}
