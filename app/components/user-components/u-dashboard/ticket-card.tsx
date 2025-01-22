'use client';

import React, { useEffect, useState } from "react";
import { Calendar, ChevronRight, MapPin } from "lucide-react";
import { Tickets } from "../u-tickets/types";
import { motion, AnimatePresence } from "framer-motion";

export default function TicketCard() {
  const [tickets, setTickets] = useState<Tickets[]>([]);
  const [error, setError] = useState("");
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
  return (
    <div className="card bg-white border border-gray-300 rounded-lg p-4">
      <div className="flex flex-row justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Submitted Tickets</h2>
        </div>
        <div>
          <ChevronRight className="h-7 w-auto text-black mt-0.5 hover:bg-gray-100 rounded-full " />
        </div>
      </div>
      <ul className="text-gray-500">
        <AnimatePresence>
          {tickets.slice(0, 5).map((ticket, index) => (
            <motion.li
              key={ticket.id}
              className={`border-b py-5 md:px-2 px-5 hover:bg-gray-50 ${
                index === 0 ? "border-t" : ""
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-row justify-between h-full items-center space-y-2">
                <div className="uppercase font-bold text-black">
                  ticket - {ticket.id} || {ticket.title ? ticket.title : ticket.concern_type} 
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
    </div>
  );
}
