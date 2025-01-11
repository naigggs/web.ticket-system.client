"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

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
  if (!ticket) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-[90vw] sm:w-full max-h-[90vh] overflow-y-auto rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-left">{ticket.title}</DialogTitle>
          <DialogDescription>08:23 am | 09/14/2024</DialogDescription>
        </DialogHeader>
        <Separator/>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">ID</label>
              <p className="bg-gray-100 p-2 rounded mt-1">{ticket.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <p className="bg-gray-100 p-2 rounded mt-1 uppercase">{ticket.status}</p>
            </div>
          </div>
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
            ></textarea>
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