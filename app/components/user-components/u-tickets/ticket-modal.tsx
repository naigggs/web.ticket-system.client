"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useMediaQuery from "@/hooks/use-media-query";

interface ModalProps {
  ticket: {
    id: number;
    title: string;
    description: string;
    status: string;
    location: string;
    created_at: string;
    ticket_status: "Open" | "In Progress" | "Closed" | "On Hold";
    address: string;
    concern_type: string;
    attachment_1: string;
    attachment_2: string;
    name: string;
    birthdate: string;
    age: number;
    birthplace: string;
    height: string;
    weight: string;
    civil_status: string;
    contact_person_name: string;
    contact_person_number: string;
    purpose: string;
  } | null;
  onClose: () => void;
}

export function TicketModal({ ticket, onClose }: ModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (!ticket) return null;

  if (isDesktop) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{ticket?.title}</DialogTitle>
            <DialogDescription>{ticket?.description}</DialogDescription>
          </DialogHeader>
          <div className="font-bold text-md">{ticket?.description}</div>
          <div className="text-sm">{ticket?.ticket_status}</div>
          <div className="mt-4 text-gray-500 text-sm flex items-center">
            {new Date(ticket.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={true} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{ticket?.title}</DrawerTitle>
          <DrawerDescription className="max-h-[calc(100vh-200px)] overflow-y-auto">
            {ticket?.description}
          </DrawerDescription>
        </DrawerHeader>
        <div className="text-md font-bold w-[92%] mx-auto">{ticket?.title}</div>
        <div className="text-sm flex w-[92%] mx-auto">
          {" "}
          {ticket?.description} {ticket?.description} {ticket?.description}{" "}
          {ticket?.description}{" "}
        </div>
        <DrawerFooter className="pt-2">
          {new Date(ticket.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
