"use client";

import React, { useEffect, useState } from "react";
import { Calendar, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Announcements } from "../u-announcements/types";

export default function AnnouncementCard() {
  const [announcements, setAnnouncements] = useState<Announcements[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUserAnnouncements() {
      try {
        const response = await fetch(`/api/announcements`);
        if (!response.ok) {
          throw new Error("Failed to fetch announcement for user");
        }
        const data = await response.json();
        setAnnouncements(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    }

    fetchUserAnnouncements();
  }, []);
  return (
    <ul className="text-gray-500">
      <AnimatePresence>
        {announcements.slice(0, 5).map((announcement, index) => (
          <motion.li
            key={announcement.id}
            className={`mb-4 ${index === 0 ? "" : ""}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow shadow-sm">
              <div className="flex flex-row justify-between h-full items-center space-y-2">
                <div className="uppercase font-bold text-black text-lg">
                  {announcement.title}
                </div>
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
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
