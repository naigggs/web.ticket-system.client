import { useState } from "react";
import { ChevronRight, Calendar } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TicketList from "./TicketList";

export const TaskColumn = ({
  title,
  tickets,
  status,
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

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Card className={`flex flex-col h-auto border-r border-t border-gray-300 ${isFirstColumn ? "" : ""} ${isLastColumn ? "border-r-0" : ""}`}>
      <div className="flex flex-row justify-between p-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Submitted Tickets</h2>
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
        {Array.from(
          { length: Math.ceil(tickets.length / ticketsPerPage) },
          (_, i) => (
            <Button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              variant={currentPage === i + 1 ? "default" : "outline"}
              className="mx-1 px-3 py-1 rounded-full text-sm"
            >
              {i + 1}
            </Button>
          )
        )}
      </CardFooter>
    </Card>
  );
};
