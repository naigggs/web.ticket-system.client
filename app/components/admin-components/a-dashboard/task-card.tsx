import { useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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
  const ticketsPerPage = 4;

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const totalPages = Math.ceil(tickets.length / ticketsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col h-auto gap-4 md:gap-0 md:h-[650px] border-gray-300">
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="grid grid-cols-1 gap-4">
          {currentTickets.map((ticket) => (
            <Card
              key={ticket.id}
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onTicketClick(ticket)}
            >
              <div className="flex flex-col space-y-2">
                <h3 className="text-lg font-semibold uppercase">
                  ticket - {ticket.id} ||{" "}
                  {ticket.title ? ticket.title : ticket.concern_type}{" "}
                </h3>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Assignee:</span>
                  <span className="text-sm font-medium">
                    {ticket?.assignee_id?.full_name
                      ? ticket?.assignee_id?.full_name
                      : "None"}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <DashboardPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
