import React from 'react';
import { getBadgeColor } from '../badge-color';
import { Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tickets } from "./types.js";

// Define the type for the props
interface TicketListProps {
  ticket: Tickets;
  onTicketClick: (ticket: Tickets) => void;
}

const TicketList: React.FC<TicketListProps> = ({ ticket, onTicketClick }) => {
  
  return (
    <div>
      <li
        key={ticket.id}
        className="border-b last:border-b-0 p-4 hover:bg-gray-50 transition-colors rounded-md cursor-pointer"
        onClick={() => onTicketClick(ticket)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="uppercase font-bold text-sm md:text-base text-black line-clamp-2">
              ticket - {ticket.id}
            </div>
          </div>
          <Badge
            className={`${getBadgeColor(
              ticket.ticket_status
            )} h-6 px-2 flex items-center justify-center rounded-full whitespace-nowrap text-[10px] uppercase font-bold shrink-0 pointer-events-none`}
          >
            {ticket.ticket_status}
          </Badge>
        </div>
        <div className="text-xs md:text-sm my-2 line-clamp-3 text-gray-600">
          {ticket.location || ticket.address}
        </div>
        <div className="text-gray-400 text-xs md:text-sm flex items-center mt-2">
          <span className="text-gray-400 text-sm flex flex-row items-center">
            <Calendar className="h-3.5 -mt-0.5 w-auto mr-1" />
            {new Date(ticket.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </li>
    </div>
  );
};

export default TicketList;