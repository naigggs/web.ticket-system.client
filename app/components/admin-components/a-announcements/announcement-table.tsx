"use client";

import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnnouncementDatePicker } from "./date-picker-announcement";
import { Input } from "@/components/ui/input";
import { AnnouncementModal } from "./modal-announcement";
import { CreateAnnouncements } from "./create-announcements";
import { Announcements } from "./types";
import { createClient } from "@/utils/supabase/client";

export default function AnnouncementsTable() {
  const [announcements, setAnnouncements] = useState<Announcements[]>([]);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [error, setError] = useState("");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any | null>(null);
  const supabase = createClient();
  

  const fetchAnnouncements = async () => {
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

  useEffect(() => {
    // Fetch announcements
    fetchAnnouncements();
  
    // Set up real-time subscription for announcements
    const subscription = supabase
      .channel("announcements-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "announcements" },
        (payload) => {
          switch (payload.eventType) {
            case "INSERT":
              setAnnouncements((prev) => [payload.new as Announcements, ...prev]); // Prepend the new announcement
              break;
            case "UPDATE":
              setAnnouncements((prev) =>
                prev.map((announcement) =>
                  announcement.id === payload.new.id ? (payload.new as Announcements) : announcement
                )
              );
              break;
            case "DELETE":
              setAnnouncements((prev) =>
                prev.filter((announcement) => announcement.id !== payload.old.id)
              );
              break;
            default:
              break;
          }
        }
      )
      .subscribe();
  
    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(subscription);
    };
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

  return (
    <div className="">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between w-full h-full mb-6 mt-4 p-0">
        <h2 className="text-center text-xl md:text-2xl mb-3 md:mb-0 font-semibold">Announcements</h2>
        <div className="flex flex-col md:flex-row items-center gap-2 md:w-auto">
            <div className="flex flex-row justify-center items-center gap-2">
              <Input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-auto focus-visible:ring-0"
              />
              <AnnouncementDatePicker onDateChange={setSelectedDate} />
              <CreateAnnouncements />
            </div>
        </div>

      </div>

      {/* Announcements List */}
      <ul className="text-gray-500 w-full">
        <AnimatePresence>
          {filteredAnnouncements.map((announcement, index) => (
            <motion.li
              key={announcement.id}
              className={`border-b py-5 px-4 hover:bg-gray-50 cursor-pointer ${
                index === 0 ? "border-t" : ""
              }`}
              onClick={() => setSelectedAnnouncement(announcement)}
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

      {/* Announcement Modal */}
      <div className="p-1">
        <AnnouncementModal
          announcement={selectedAnnouncement}
          onClose={() => setSelectedAnnouncement(null)}
        />
      </div>
    </div>
  );
}