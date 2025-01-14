import React from "react";
import { announcements } from "@/app/data/u-dash";
import { Calendar, ChevronRight } from "lucide-react";

export default function AnnouncementCard() {
  return (
    <div className="card bg-white border border-gray-300 rounded-lg p-4">
      <div className="flex flex-row justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Events & Announcements
          </h2>
        </div>
        <div>
          <ChevronRight className="h-7 w-auto text-black mt-0.5 hover:bg-gray-100 rounded-full " />
        </div>
      </div>
      <ul className="text-gray-500 animate-in fade-in slide-in-from-bottom-8 duration-500">
        {announcements.map((announcements) => (
          <li
            key={announcements.id}
            className="border-b py-5 px-5 hover:bg-gray-50"
          >
            <div className="flex flex-row justify-between">
              <div className="uppercase font-bold text-black">
                {announcements.title}
              </div>
            </div>
            <div className="text-sm my-2 line-clamp-3">
              {announcements.description}
            </div>
            <div>
              <span className="text-gray-400 text-sm flex flex-row items-center">
                <Calendar className="h-3.5 -mt-0.5 w-auto mr-1" />
                {announcements.created_at}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
