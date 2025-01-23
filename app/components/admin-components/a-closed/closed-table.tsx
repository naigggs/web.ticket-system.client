import { useState } from "react";
import { ChevronRight, Calendar } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ClosedPagination } from "./closed-pagination";
import { getBadgeColor } from "../badge-color";
import { Tickets } from "../a-taskboard/types";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const ClosedTable = ({
  title,
  tickets,
  onTicketClick,
  searchQuery,
  setSearchQuery,
  isLastColumn,
  isFirstColumn,
}: {
  title: string;
  tickets: Tickets[];
  status: string;
  onTicketClick: (ticket: Tickets) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
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
    <div className="flex flex-col h-auto">
      <div className="flex flex-row justify-between p-4">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold mb-2">{title} tickets</h2>
        </div>
        <div className="relative w-40 md:w-64 h-10">
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-full pl-10 pr-4 py-2 text-sm placeholder:text-gray-500 focus:ring-1"
            placeholder="Search tickets"
          />
          <Search className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-gray-400" />
        </div>
      </div>
      <CardContent className="flex-1">
        <div
          className="overflow-x-auto overflow-y-auto"
          style={{ maxHeight: "calc(88vh - 200px)" }}
        >
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs md:text-sm">ID</TableHead>
                <TableHead className="text-xs md:text-sm">Title</TableHead>
                <TableHead className="text-xs md:text-sm">Status</TableHead>
                <TableHead className="text-xs md:text-sm">Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentTickets.map((ticket) => (
                <TableRow
                  key={ticket.id}
                  onClick={() => onTicketClick(ticket)}
                  className="cursor-pointer hover:bg-gray-50 h-16"
                >
                  <TableCell className="font-medium text-xs md:text-sm">
                    {ticket.id}
                  </TableCell>
                  <TableCell className="font-medium text-xs md:text-sm">
                    {ticket.title}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${getBadgeColor(
                        ticket.ticket_status
                      )} h-6 px-3 rounded-full whitespace-nowrap text-[10px] uppercase font-bold shrink-0 pointer-events-none`}
                    >
                      {ticket.ticket_status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-gray-400 text-xs md:text-sm flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1.5" />
                      {ticket.created_at}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center mt-4">
        <ClosedPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </CardFooter>
    </div>
  );
};