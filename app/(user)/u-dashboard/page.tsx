import React from "react";
import TicketCard from "@/app/components/user-components/u-dashboard/ticket-card";
import AnnouncementCard from "@/app/components/user-components/u-dashboard/announcement-card";
import SurveyCard from "@/app/components/user-components/u-dashboard/survey-card";

export default function UserDashboard() {
  return (
    <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <div className="text-4xl font-bold text-center md:text-left">
        Goodmorning User!
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
        <div className="col-span-1 sm:col-span-2 lg:col-span-4">
          <TicketCard />
        </div>
        <div className="col-span-1 sm:col-span-1 lg:col-span-2">
          <AnnouncementCard />
        </div>
        <div className="col-span-1 sm:col-span-1 lg:col-span-2">
          <SurveyCard />
        </div>
      </div>
    </div>
  );
}
