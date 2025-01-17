import { useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import TicketList from "./ticket-list";
import { DashboardPagination } from "./dashboard-pagination";

export const TaskCard = ({
  title,
  tickets,
  onTicketClick,
  isLastColumn,
  isFirstColumn,
}: {
  title: string;
  tickets: any[];
  status: string;
  onTicketClick: (ticket: any) => void;
  isLastColumn?: boolean;
  isFirstColumn?: boolean;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 5;

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const totalPages = Math.ceil(tickets.length / ticketsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Card className='flex flex-col h-auto border-r border-t border-gray-300'>
      <div className="flex flex-row justify-between p-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        </div>
        <div>
          <ChevronRight className="h-7 w-auto text-black mt-0.5 hover:bg-gray-100 rounded-full " />
        </div>
      </div>
      <CardContent className="flex-1 overflow-y-auto scrollbar-thin">
        <ul className="space-y-2">
          {currentTickets.map((ticket) => (
            <TicketList
              key={ticket.id}
              ticket={ticket}
              onTicketClick={onTicketClick}
            />
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex justify-center mt-4">
        <DashboardPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </CardFooter>
    </Card>
  );
};