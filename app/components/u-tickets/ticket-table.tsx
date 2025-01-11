"use client";

import React, { useState } from "react";
import { tickets } from "@/app/data/u-dash";
import { Calendar, MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { TicketDatePicker } from "./date-picker-ticket.tsx";
import { Input } from "@/components/ui/input";
import SubmitTicket from "./submit-ticket";

export default function TicketsTable() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus =
      filter === "all" || ticket.status.toLowerCase() === filter.toLowerCase();
    const matchesDate =
      !selectedDate ||
      new Date(ticket.created_at).toDateString() ===
        selectedDate.toDateString();
    const matchesSearch = ticket.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesStatus && matchesDate && matchesSearch;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between h-full items-center mb-6 mt-4 w-[90%] md:w-full mx-auto">
        <h2 className="text-2xl font-semibold mb-4 md:mb-0">
          Submitted Tickets
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
          <div className="w-full md:w-auto">
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-auto"
            />
          </div>
          <div className="w-full md:w-auto">
            <TicketDatePicker onDateChange={setSelectedDate} />
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-row justify-between h-full items-center">
                <div className="uppercase font-bold text-black">
                  {ticket.title}
                </div>
                <div className="text-sm bg-blue-200 text-blue-800 px-3 py-1 uppercase font-semibold inline-flex rounded-full">
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
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
