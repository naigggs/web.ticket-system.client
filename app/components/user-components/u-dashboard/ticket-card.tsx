"use client";

import React, { useEffect, useState } from "react";
import { Calendar, ChevronRight, MapPin } from "lucide-react";
import { Tickets } from "../u-tickets/types";
import { motion, AnimatePresence } from "framer-motion";
import { TicketModal } from "../ticket-modal";
import { DashboardPagination } from "./dashboard-pagination";
import { getBadgeColor } from "../../admin-components/badge-color";
import { Badge } from "@/components/ui/badge";

export default function TicketCard() {
  const [tickets, setTickets] = useState<Tickets[]>([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 6;

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const totalPages = Math.ceil(tickets.length / ticketsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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
  }, []);

  const handleTicketClick = (ticket: Tickets) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  return (
    <ul className="text-gray-500">
      <AnimatePresence>
        {currentTickets.map((ticket, index) => (
          <motion.li
            key={ticket.id}
            className={`mb-4 ${index === 0 ? "" : ""}`}
            initial={{ opacity: 0, y: 10 }}
            onClick={() => handleTicketClick(ticket)}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white border hover:cursor-pointer border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow shadow-sm">
              <div className="flex flex-row justify-between h-full items-center space-y-1">
                <div className="uppercase font-bold text-black text-lg">
                  Ticket - {ticket.id} ||{" "}
                  {ticket.title ? ticket.title : ticket.concern_type}
                </div>
              </div>
              <div className="flex flex-row gap-3 mt-2">
                <div>
                  <span className="text-gray-400 text-sm flex flex-row items-center mt-0.5">
                    <Calendar className="h-3.5 -mt-0.5 w-auto mr-1" />
                    {new Date(ticket.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <Badge
                    className={`${getBadgeColor(
                      ticket.ticket_status
                    )} h-6 px-2 flex items-center justify-center rounded-full whitespace-nowrap text-[10px] uppercase font-bold shrink-0 pointer-events-none`}
                  >
                    {ticket.ticket_status}
                  </Badge>
                </div>
              </div>
            </div>
          </motion.li>
        ))}
        <div className="flex justify-center">
          <DashboardPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </AnimatePresence>
      <TicketModal
        isOpen={isModalOpen}
        onClose={closeModal}
        ticket={selectedTicket}
      />
    </ul>
  );
}
