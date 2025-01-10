"use client";

import React from "react";
import { Calendar, ChevronRight } from "lucide-react";
import { tickets, announcements, surveys } from "@/app/data/u-dash";

export default function TicketPage() {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="text-4xl font-bold text-center md:text-left">
        Submit your Tickets here!
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 mt-4">
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
            {tickets.map((ticket) => (
              <li
                key={ticket.id}
                className="border-b py-5 px-5 hover:bg-gray-50"
              >
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
                <div>
                  <span className="text-gray-400 text-sm flex flex-row items-center">
                    <Calendar className="h-3.5 -mt-0.5 w-auto mr-1" />
                    {ticket.created_at}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
