'use client';

import React, { useEffect, useState } from "react";
import TicketCard from "@/app/components/user-components/u-dashboard/ticket-card";
import AnnouncementCard from "@/app/components/user-components/u-dashboard/announcement-card";
import SurveyCard from "@/app/components/user-components/u-dashboard/survey-card";
import { TicketSubmitted } from "@/app/components/user-components/u-dashboard/ticket-submitted";
import { TicketStatus } from "@/app/components/user-components/u-dashboard/ticket-status";
import { Ticket } from "lucide-react";
import { User } from "@/app/components/sidebar/types";

export default function UserDashboard() {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await fetch(`/api/user`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        if (data && data.length > 0) {
          setUser(data[0]);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    }

    fetchUserInfo();
  }, []);

  return (
    <div className="px-10 my-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl md:text-2xl flex items-center font-bold text-center">
          Goodmorning {user?.first_name} {user?.last_name}!
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {/* Left Side: Tickets */}
        <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-8 duration-300">
          <div className="px-4 py-2 bg-green-300 rounded-2xl font-bold">
            Tickets
          </div>
          <TicketCard />
        </div>

        {/* Center: Announcements */}
        <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="px-4 py-2 bg-blue-300 rounded-2xl font-bold">
            Announcements
          </div>
          <AnnouncementCard />
        </div>

        {/* Right Side: Surveys */}
        <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="px-4 py-2 bg-red-400 rounded-2xl font-bold">
            Surveys
          </div>
          <SurveyCard />
        </div>
      </div>
    </div>
  );
}
