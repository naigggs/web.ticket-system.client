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

export const TaskCard = ({
  title,
  tickets,
  status,
  onTicketClick,
}: {
  title: string;
  tickets: any[];
  status: string;
  onTicketClick: (ticket: any) => void;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 5;

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Card className="flex flex-col h-auto">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-xl md:text-2xl font-semibold flex-1">
          {title}
        </CardTitle>
        <Button variant="ghost" size="icon">
          <ChevronRight className="h-6 w-6" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto scrollbar-thin">
        <ul className="space-y-2">
          {currentTickets.map((ticket) => (
              <TicketList
                key={ticket.id}
                ticket={ticket}
                onTicketClick={onTicketClick}
                status={ticket.status} // Pass the status prop if needed
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
