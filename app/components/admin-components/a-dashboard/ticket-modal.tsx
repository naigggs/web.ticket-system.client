"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "@/hooks/use-media-query";
import { getBadgeColor } from "../badge-color";

interface Ticket {
  id: number;
  title: string;
  description: string;
  status: string;
  // Add other fields as needed
}

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: Ticket | null;
}

export function TicketModal({ isOpen, onClose, ticket }: TicketModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!ticket) return null;

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl w-[90vw] sm:w-full max-h-[90vh] overflow-y-auto rounded-lg">
          <DialogHeader className="text-left space-y-2">
            <div className="text-md font-medium text-gray-500 -mt-4 -mb-2">#{ticket.id}</div>
            <DialogTitle className="flex items-center gap-x-4">
              <span className="text-xl font-semibold text-gray-900">{ticket.title}</span>
              <Badge
                className={`${getBadgeColor(
                  ticket.status
                )} h-6 px-2 flex items-center justify-center rounded-full whitespace-nowrap text-[10px] uppercase font-bold shrink-0 pointer-events-none`}
              >
                {ticket.status}
              </Badge>
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              08:23 am | 09/14/2024
            </DialogDescription>
            <DialogDescription className="text-sm text-gray-600">
              Requestor | <span className="font-medium text-gray-700">Carlos Joaquin Martin</span>
            </DialogDescription>
          </DialogHeader>
          <Separator />
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category *</label>
              <p className="bg-gray-100 p-2 rounded mt-1">Infrastructure Issues</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Problem/Concern</label>
              <p className="bg-gray-100 p-2 rounded mt-1">{ticket.description}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <p className="bg-gray-100 p-2 rounded mt-1">Camla Street Purok 2</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Assignee</label>
                <p className="bg-gray-100 p-2 rounded mt-1">Khen Luat</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Requestor</label>
                <p className="bg-gray-100 p-2 rounded mt-1">Carlos Joaquin Martin</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Attachment 1</label>
                <Input id="picture" type="file" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Attachment 2</label>
                <Input id="picture" type="file" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Comment</label>
              <textarea
                className="w-full p-2 border rounded mt-1"
                placeholder="Add comment or note"
                rows={3}
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded">
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
      <DrawerContent className="w-full max-h-[100vh]">
        <DrawerHeader className="text-left">
          <div className="text-md font-medium text-gray-500 -mt-4 -mb-2">#{ticket.id}</div>
          <DrawerTitle className="flex items-center justify-between">
            <span>{ticket.title}</span>
            <Badge
              className={`${getBadgeColor(
                ticket.status
              )} h-6 px-2 flex items-center justify-center rounded-full whitespace-nowrap text-[10px] uppercase font-bold shrink-0 pointer-events-none`}
            >
              {ticket.status}
            </Badge>
          </DrawerTitle>
          <DrawerDescription>08:23 am | 09/14/2024</DrawerDescription>
          <DrawerDescription>Requestor | Carlos Joaquin Martin </DrawerDescription>
        </DrawerHeader>
        <Separator />
        <div className="space-y-4 p-4 overflow-y-auto">

          <div>
            <label className="block text-sm font-medium text-gray-700">Category *</label>
            <p className="bg-gray-100 p-2 rounded mt-1">Infrastructure Issues</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Problem/Concern</label>
            <p className="bg-gray-100 p-2 rounded mt-1">{ticket.description}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <p className="bg-gray-100 p-2 rounded mt-1">Camla Street Purok 2</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Assignee</label>
              <p className="bg-gray-100 p-2 rounded mt-1">Khen Luat</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Attachment 1</label>
                <Input id="picture" type="file" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Attachment 2</label>
                <Input id="picture" type="file" />
              </div>
          </div>
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
            <Button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded">
              Send
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}