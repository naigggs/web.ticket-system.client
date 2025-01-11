import { useState } from "react";
import { ChevronRight, Calendar } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const getBadgeColor = (status: string) => {
  const colors = {
    todo: "bg-blue-200 text-blue-600",
    inprogress: "bg-yellow-200 text-yellow-600",
    onhold: "bg-red-200 text-red-600",
    done: "bg-green-200 text-green-600",
  };
  return colors[status as keyof typeof colors] || colors.todo;
};

export const TicketCard = ({ title, tickets, status, onTicketClick }: { title: string; tickets: any[]; status: string; onTicketClick: (ticket: any) => void }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 5;

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Card className="flex flex-col h-auto">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-xl md:text-2xl font-semibold flex-1">{title}</CardTitle>
        <Button variant="ghost" size="icon">
          <ChevronRight className="h-6 w-6" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto scrollbar-thin">
        <ul className="space-y-2">
          {currentTickets.map((ticket) => (
            <li key={ticket.id} className="border-b last:border-b-0 p-4 hover:bg-gray-50 transition-colors rounded-md cursor-pointer" onClick={() => onTicketClick(ticket)}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="uppercase font-bold text-sm md:text-base text-black line-clamp-2">
                    {ticket.title}
                  </div>
                </div>
                <Badge className={`${getBadgeColor(status)} h-6 px-2 flex items-center justify-center rounded-md whitespace-nowrap text-[10px] uppercase font-bold shrink-0`}>
                  {ticket.status}
                </Badge>
              </div>
              <div className="text-xs md:text-sm my-2 line-clamp-3 text-gray-600">
                {ticket.description}
              </div>
              <div className="text-gray-400 text-xs md:text-sm flex items-center mt-2">
                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                {ticket.created_at}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(tickets.length / ticketsPerPage) }, (_, i) => (
          <Button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            variant={currentPage === i + 1 ? "default" : "outline"}
            className="mx-1 px-3 py-1 rounded-full text-sm"
          >
            {i + 1}
          </Button>
        ))}
      </CardFooter>
    </Card>
  );
};