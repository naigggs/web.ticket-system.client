"use client";

import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnnouncementDatePicker } from "./date-picker-announcement";
import { Input } from "@/components/ui/input";
import { AnnouncementModal } from "./announcement-modal";
import { Button } from "@/components/ui/button";
import { Announcements } from "./types";
import { AnnouncementPagination } from "./announcement-pagination";

export default function AnnouncementsTable() {
  const [announcements, setAnnouncements] = useState<Announcements[]>([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  
   useEffect(() => {
      async function fetchAnnouncements() {
        try {
          const response = await fetch(`/api/announcements`);
          if (!response.ok) {
            throw new Error("Failed to fetch tickets for user");
          }
          const data = await response.json();
          setAnnouncements(data);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "An unknown error occurred"
          );
        }
      }
  
      fetchAnnouncements();
    }, []);


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

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedDate]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAnnouncements.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredAnnouncements.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
        </div>
      </div>
      <ul className="text-gray-500">
        <AnimatePresence>
          {currentItems.map((announcement, index) => (
            <motion.li
              key={announcement.id}
              className={`border-b py-5 px-5 hover:bg-gray-50 cursor-pointer ${
                index === 0 ? "border-t" : ""
              }`}
              onClick={() => setSelectedAnnouncement(announcement)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="uppercase font-bold text-black hover:underline ">
                {announcement.title}
              </div>
              <div className="text-sm my-2 line-clamp-3">
                {announcement.description}
              </div>
              <div>
                <span className="text-gray-400 text-sm flex flex-row items-center">
                  <Calendar className="h-3.5 -mt-0.5 w-auto mr-1" />
                  {new Date(announcement.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                </span>
              </div>
            </motion.li>
          ))}
          <div className="mt-4">
            <AnnouncementPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </AnimatePresence>
      </ul>
      <AnnouncementModal
        announcement={selectedAnnouncement}
        onClose={() => setSelectedAnnouncement(null)}
      />
    </div>
  );
}
