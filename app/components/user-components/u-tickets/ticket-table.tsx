"use client";

import React, { useState, useEffect } from "react";
import { Calendar, MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { TicketDatePicker } from "./date-picker-ticket";
import { Input } from "@/components/ui/input";
import SubmitTicket from "./submit-ticket";
import { Tickets } from "./types.js";
import { TicketModal } from "../ticket-modal";
import { createClient } from "@/utils/supabase/client";

export default function TicketsTable() {
  const [tickets, setTickets] = useState<Tickets[]>([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);

  const supabase = createClient();

  useEffect(() => {
    async function fetchUserTickets() {
      try {
        const response = await fetch(`/api/tickets/user`);
        if (!response.ok) {
          throw new Error("Failed to fetch tickets for user");
        }
        const data = await response.json();
        setTickets(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    }

    fetchUserTickets();

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
                  ticket.id === (payload.new as Tickets).id
                    ? (payload.new as Tickets)
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

  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus =
      filter === "all" ||
      ticket.ticket_status.toLowerCase() === filter.toLowerCase();
    const matchesDate =
      !selectedDate ||
      new Date(ticket.created_at).toDateString() ===
        selectedDate.toDateString();
    return matchesStatus && matchesDate;
  });

  const handleTicketClick = (ticket: Tickets) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between h-full items-center mb-6 mt-4 w-[90%] md:w-full mx-auto">
        <h2 className="text-2xl font-semibold mb-4 md:mb-0">
          Submitted Tickets
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
          <div className="flex flex-row w-full gap-2">
            {" "}
            <div className="w-full md:w-auto">
              <Input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-auto"
              />
            </div>
            <div className="md:w-auto">
              <TicketDatePicker onDateChange={setSelectedDate} />
            </div>
          </div>

          <div className="w-full md:w-auto">
            <Select onValueChange={(value) => setFilter(value)}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="on hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-auto">
            <SubmitTicket />
          </div>
        </div>
      </div>
      <ul className="text-gray-500">
        <AnimatePresence>
          {filteredTickets.map((ticket, index) => (
            <motion.li
              key={ticket.id}
              className={`border-b py-5 md:px-2 px-5 hover:bg-gray-50 ${
                index === 0 ? "border-t" : ""
              }`}
              onClick={() => handleTicketClick(ticket)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-row justify-between h-full items-center space-y-2">
                <div className="uppercase font-bold text-black">
                  ticket - {ticket.id} ||{" "}
                  {ticket.title ? ticket.title : ticket.concern_type}
                </div>
                <div className="text-sm bg-blue-200 text-blue-800 px-3 py-1 uppercase font-semibold inline-flex rounded-full">
                  {ticket.ticket_status}
                </div>
              </div>
              <div className="flex flex-row gap-3">
                <div>
                  <span className="text-gray-400 text-sm flex flex-row items-center">
                    <MapPin className="h-3.5 -mt-0.5 w-auto mr-1" />
                    {ticket.location || ticket.address}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 text-sm flex flex-row items-center">
                    <Calendar className="h-3.5 -mt-0.5 w-auto mr-1" />
                    {new Date(ticket.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <TicketModal
        isOpen={isModalOpen}
        onClose={closeModal}
        ticket={selectedTicket}
      />
    </div>
  );
}
