"use client";

import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

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

  const renderContent = () => {
    switch (ticket.concern_type) {
      case "Barangay ID":
        return (
          <div className="h-auto">
            <div className="flex flex-row items-center gap-56">
              <div className="grid items-center ">
                <div className="uppercase font-semibold text-lg">
                  ticket - {ticket.id}
                </div>
              </div>
              <div className="grid items-center ">
                <div className="uppercase font-semibold text-lg">
                  {ticket.concern_type}
                </div>
              </div>
              <div className="grid items-center">
                <span className="">
                  <Badge>{ticket.ticket_status}</Badge>
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-2">
              <div className="grid w-full items-center ">
                <Label>Full Name</Label>
                <span className="">{ticket.name}</span>
              </div>

              <div className="flex flex-row w-full">
                <div className="grid w-full items-center">
                  <Label>Birthdate</Label>
                  <span className="">
                    {ticket.birthdate ? ticket.birthdate : "January 01, 2025"}
                  </span>
                </div>
                <div className="grid w-full items-center">
                  <Label>Birthplace</Label>
                  <span className="">{ticket.birthplace}</span>
                </div>
                <div className="grid w-full items-center">
                  <Label>Age</Label>
                  <span className="">{ticket.age}</span>
                </div>
              </div>
              <div className="flex flex-row items-center gap-4">
                <div className="grid w-full items-center">
                  <Label>Height</Label>
                  <span className="">{ticket.height} cm</span>
                </div>
                <div className="grid w-full items-center">
                  <Label>Weight</Label>
                  <span className="">{ticket.weight} kg</span>
                </div>
                <div className="grid w-full items-center">
                  <Label>Civil Status</Label>
                  <span className="">{ticket.civil_status}</span>
                </div>
              </div>
              <div className="grid w-full items-center">
                <Label>Address/Purok #</Label>
                <span className="">{ticket.address}</span>
              </div>
              <div className="-mt-4">
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">
                      In Case of Emergency Contact Person
                    </span>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-4">
                  <div className="grid w-full items-center">
                    <Label>Contact Person Name</Label>
                    <span className="">{ticket.contact_person_name}</span>
                  </div>
                  <div className="grid w-full items-center">
                    <Label>Mobile Number</Label>
                    <span className="">{ticket.contact_person_number}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "Barangay Certificate":
        return (
          <div className="h-auto">
            <div className="flex flex-row items-center gap-44">
              <div className="grid items-center">
                <div className="uppercase font-semibold text-lg">
                  ticket - {ticket.id}
                </div>
              </div>
              <div className="grid items-center ">
                <div className="uppercase font-semibold text-lg">
                  {ticket.concern_type}
                </div>
              </div>
              <div className="grid items-center">
                <span className="">
                  <Badge>{ticket.ticket_status}</Badge>
                </span>
              </div>
            </div>
            <div className="grid w-full items-center mt-2">
              <Label>Full Name</Label>
              <span className="">{ticket.name}</span>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex flex-row items-center gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label>Age</Label>
                  <span className="">{ticket.age}</span>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label>Civil Status</Label>
                  <span className="">{ticket.civil_status}</span>
                </div>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label>Address/Purok #</Label>
                <span className="">{ticket.address}</span>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label>Purpose</Label>
                <span className="">{ticket.purpose}</span>
              </div>
            </div>
          </div>
        );
      case "Barangay Clearance":
        return (
          <div className="h-auto">
            <div className="flex flex-row items-center gap-44">
              <div className="grid items-center">
                <div className="uppercase font-semibold text-lg">
                  ticket - {ticket.id}
                </div>
              </div>
              <div className="grid items-center ">
                <div className="uppercase font-semibold text-lg">
                  {ticket.concern_type}
                </div>
              </div>
              <div className="grid items-center">
                <span className="">
                  <Badge>{ticket.ticket_status}</Badge>
                </span>
              </div>
            </div>
            <div className="grid w-full items-center mt-2">
              <Label>Full Name</Label>
              <span className="">{ticket.name}</span>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex flex-row items-center gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label>Age</Label>
                  <span className="">{ticket.age}</span>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label>Purpose</Label>
                  <span className="">{ticket.purpose}</span>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label>Status</Label>
                  <span className="">{ticket.status}</span>
                </div>
              </div>

              <div className="grid w-full items-center ">
                <Label>Address/Purok #</Label>
                <span className="">{ticket.address}</span>
              </div>
            </div>
          </div>
        );
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-[800px]">
          <DialogTitle className="sr-only"></DialogTitle>
          {renderContent()}
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={true} onOpenChange={onClose}>
      <DrawerContent>
        <DialogTitle className="sr-only"></DialogTitle>
       {renderContent()}
      </DrawerContent>
    </Drawer>
  );
}
