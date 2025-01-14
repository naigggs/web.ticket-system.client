'use client';

import React, { useEffect, useState } from "react";
import { Calendar, ChevronRight, MapPin } from "lucide-react";
import { Tickets } from "../u-tickets/types";

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
      <ul className="text-gray-500 animate-in fade-in slide-in-from-bottom-8 duration-500">
        {tickets.slice(0, 5).map((ticket) => (
          <li key={ticket.id} className="border-b py-5 px-5 hover:bg-gray-50">
            <div className="flex flex-row justify-between">
              <div className="uppercase font-bold text-black">
                {ticket.title}
              </div>
              <div className="text-[10px] bg-blue-200 text-blue-800 px-2 py-1 uppercase font-semibold inline-flex rounded-md">
                {ticket.status}
              </div>
            </div>
            <div className="text-sm my-2 line-clamp-3">
              {ticket.description}
            </div>
            <div className="flex flex-row gap-3">
              <div>
                <span className="text-gray-400 text-sm flex flex-row items-center">
                  <MapPin className="h-3.5 -mt-0.5 w-auto mr-1" />
                  {ticket.location}
                </span>
              </div>
              <div>
                <span className="text-gray-400 text-sm flex flex-row items-center">
                  <Calendar className="h-3.5 -mt-0.5 w-auto mr-1" />
                  {ticket.created_at}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
