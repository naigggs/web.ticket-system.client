"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { useMediaQuery } from "@/hooks/use-media-query";
import { getBadgeColor } from "../badge-color";
import { Tickets } from "../a-taskboard/types";
import { createClient } from "@/utils/supabase/client";
import { TicketStatus } from "@/app/api/tickets/types";
import { TicketContent } from "../ticket-content";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { Calendar } from "lucide-react";

interface ClosedModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: Tickets | null;
}

export function ClosedModal({ isOpen, onClose, ticket }: ClosedModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [status, setStatus] = useState<TicketStatus>("Open");
  const supabase = createClient();

  useEffect(() => {
    if (ticket) {
      setStatus(ticket.ticket_status);
    }
  }, [ticket]);

  if (!ticket) return null;

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = event.target.value as TicketStatus;
    setStatus(selectedStatus);
  };

  const updateTicketStatus = async () => {
    if (!ticket) return;
  
    const { data, error } = await supabase
      .from("tickets")
      .update({ ticket_status: "Closed" })
      .eq("id", ticket.id);
  
    if (error) {
      console.error("Error updating ticket status:", error.message);
    } else {
      onClose();
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl w-[90vw] sm:w-full max-h-[90vh] overflow-y-auto rounded-lg" onOpenAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader className="text-left space-y-2 border-b border-gray-300 pb-4">
            <DialogTitle className="flex items-center gap-x-2">
              <div className="text-xl font-bold">Ticket - {ticket.id}</div>
              <Badge
                className={`${getBadgeColor(
                  status
                )} h-6 px-2 flex items-center justify-center rounded-full whitespace-nowrap text-[10px] uppercase font-bold shrink-0 pointer-events-none`}
              >
                {status}
              </Badge>
            </DialogTitle>
            <DialogTitle className="text-lg">
              {ticket.concern_type}
            </DialogTitle>
            <DialogDescription className="text-md text-gray-600 flex flex-row items-center">
              <Calendar className="h-4 w-4 mr-1.5 -mt-[2px]" />
              {new Date(ticket.created_at).toLocaleDateString()}
            </DialogDescription>
            {ticket.ticket_status === "Resolved" ? 
              <DialogDescription>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button>
                      Acknowledge
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60 p-6">
                    <h3 className="text-md font-semibold text-gray-900">
                      Close Ticket
                    </h3>
                    <div className="text-xs text-gray-600 mb-4">
                      Are you sure you want to close this ticket?
                    </div>
                    <div className="flex justify-between">
                      <Button
                        size="sm"
                        onClick={updateTicketStatus}
                      >
                        Confirm
                      </Button>
                      <PopoverClose className="text-xs border p-2 rounded-md">
                        Cancel
                      </PopoverClose>
                    </div>
                  </PopoverContent>
                </Popover>
              </DialogDescription> : null
            } 

          </DialogHeader>
          <div className="space-y-4">
            <TicketContent ticket={ticket} status={status} onStatusChange={handleStatusChange} />
            <div>
              <label className="block text-sm font-medium text-gray-700">Comment</label>
              <textarea
                className="w-full p-2 border rounded mt-1"
                placeholder="Add comment or note"
                rows={3}
              />
            </div>
            <div className="flex justify-between">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
              <Button onClick={updateTicketStatus} className="bg-blue-500 text-white px-4 py-2 rounded">
                Send
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="w-full max-h-[96dvh]">
          <DrawerHeader className="text-left space-y-2 border-b border-gray-300 pb-4">
            <DrawerTitle className="flex items-center gap-x-2">
              <div className="text-xl font-bold">Ticket - {ticket.id}</div>
              <Badge
                className={`${getBadgeColor(
                  status
                )} h-6 px-2 flex items-center justify-center rounded-full whitespace-nowrap text-[10px] uppercase font-bold shrink-0 pointer-events-none`}
              >
                {status}
              </Badge>
            </DrawerTitle>
            <DrawerTitle className="text-lg">
              {ticket.concern_type}
            </DrawerTitle>
            <DrawerDescription className="text-md text-gray-600 flex flex-row items-center">
              <Calendar className="h-4 w-4 mr-1.5 -mt-[2px]" />
              {new Date(ticket.created_at).toLocaleDateString()}
            </DrawerDescription>
            {ticket.ticket_status === "Resolved" ? 
              <DrawerDescription>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button>
                      Acknowledge
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60 p-6">
                    <h3 className="text-md font-semibold text-gray-900">
                      Close Ticket
                    </h3>
                    <div className="text-xs text-gray-600 mb-4">
                      Are you sure you want to close this ticket?
                    </div>
                    <div className="flex justify-between">
                      <Button
                        size="sm"
                        onClick={updateTicketStatus}
                      >
                        Confirm
                      </Button>
                      <PopoverClose className="text-xs border p-2 rounded-md">
                        Cancel
                      </PopoverClose>
                    </div>
                  </PopoverContent>
                </Popover>
              </DrawerDescription> : null
            } 
          </DrawerHeader>
        <Separator />
        <div className="space-y-4 p-4 overflow-y-auto">
          <TicketContent ticket={ticket} status={status} onStatusChange={handleStatusChange} />
          <div className="flex justify-between">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
            <Button onClick={updateTicketStatus} className="bg-blue-500 text-white px-4 py-2 rounded">
              Send
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}