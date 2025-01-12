"use client";

import React, { useState } from "react";
import { announcements } from "@/app/data/u-dash";
import { Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnnouncementDatePicker } from "./date-picker-announcement";
import { Input } from "@/components/ui/input";

export default function AnnouncementsTable() {
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesDate =
      !selectedDate ||
      new Date(announcement.created_at).toDateString() ===
        selectedDate.toDateString();
    const matchesSearch = announcement.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesDate && matchesSearch;
  });

  return (
    <div>
      <div className="flex flex-row justify-between h-full items-center mb-6 mt-4">
        <h2 className="text-2xl font-semibold ml-4">Announcements</h2>
        <div className="flex flex-row items-center gap-2">
          <div>
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>
            <AnnouncementDatePicker onDateChange={setSelectedDate} />
          </div>
          <div></div>
        </div>
      </div>
      <ul className="text-gray-500">
        <AnimatePresence>
          {filteredAnnouncements.map((announcement, index) => (
            <motion.li
              key={announcement.id}
              className={`border-b py-5 px-5 hover:bg-gray-50 ${
                index === 0 ? "border-t" : ""
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="uppercase font-bold text-black hover:underline">
                {announcement.title}
              </div>

              <div className="text-sm my-2 line-clamp-3">
                {announcement.description}
              </div>
              <div>
                <span className="text-gray-400 text-sm flex flex-row items-center">
                  <Calendar className="h-3.5 -mt-0.5 w-auto mr-1" />
                  {announcement.created_at}
                </span>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
