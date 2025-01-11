import React from "react";
import TicketCard from "@/app/components/u-dashboard/ticket-card";
import AnnouncementCard from "@/app/components/u-dashboard/announcement-card";
import SurveyCard from "@/app/components/u-dashboard/survey-card";

export default function UserDashboard() {
  return (
    <div className="container mx-auto px-4 my-5 md:my-20">
      <div className="text-4xl font-bold text-center md:text-left">
        Goodmorning User!
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
        <TicketCard />
        <AnnouncementCard />
        <SurveyCard />
      </div>
    </div>
  );
}
