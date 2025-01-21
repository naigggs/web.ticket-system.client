"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "@/hooks/use-media-query";
import { getBadgeColor } from "../badge-color";
import { Tickets } from "../a-dashboard/types";
import { createClient } from "@/utils/supabase/client";
import { TicketStatus } from "@/app/api/tickets/types";
import { Label } from "@/components/ui/label";

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
      .update({ ticket_status: status })
      .eq("id", ticket.id);

    if (error) {
      console.error("Error updating ticket status:", error);
    } else {
      onClose();
    }
  };

  const renderContent = () => {
    switch (ticket.concern_type) {
      case "Barangay ID":
        return (
          <div className="h-auto">          
            {/* Main Content Section */}
            <div className="flex flex-col gap-4">
              {/* Full Name Section */}
              <div className="grid w-full items-center">
                <Label className="text-sm font-medium text-gray-700 mb-1">Full Name</Label>
                <span className="bg-gray-50 p-2 rounded-md border border-gray-300 block">
                  {ticket.name}
                </span>
              </div>
          
              {/* Birthdate, Birthplace, and Age Section */}
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-full">
                  <Label className="text-sm font-medium text-gray-700 mb-1">Birthdate</Label>
                  <span className="bg-gray-50 p-2 rounded-md border border-gray-300 block">
                    {ticket.birthdate ? ticket.birthdate : "January 01, 2025"}
                  </span>
                </div>
                <div className="w-full">
                  <Label className="text-sm font-medium text-gray-700 mb-1">Birthplace</Label>
                  <span className="bg-gray-50 p-2 rounded-md border border-gray-300 block">
                    {ticket.birthplace}
                  </span>
                </div>
                <div className="w-full">
                  <Label className="text-sm font-medium text-gray-700 mb-1">Age</Label>
                  <span className="bg-gray-50 p-2 rounded-md border border-gray-300 block">
                    {ticket.age}
                  </span>
                </div>
              </div>
          
              {/* Height, Weight, and Civil Status Section */}
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-full">
                  <Label className="text-sm font-medium text-gray-700 mb-1">Height</Label>
                  <span className="bg-gray-50 p-2 rounded-md border border-gray-300 block">
                    {ticket.height} cm
                  </span>
                </div>
                <div className="w-full">
                  <Label className="text-sm font-medium text-gray-700 mb-1">Weight</Label>
                  <span className="bg-gray-50 p-2 rounded-md border border-gray-300 block">
                    {ticket.weight} kg
                  </span>
                </div>
                <div className="w-full">
                  <Label className="text-sm font-medium text-gray-700 mb-1">Civil Status</Label>
                  <span className="bg-gray-50 p-2 rounded-md border border-gray-300 block">
                    {ticket.civil_status}
                  </span>
                </div>
              </div>
          
              {/* Address Section */}
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-full">
                  <Label className="text-sm font-medium text-gray-700 mb-1">Address/Purok #</Label>
                  <span className="bg-gray-50 h-10 flex items-center rounded-md border border-gray-300 pl-2 block">
                    {ticket.address}
                  </span>
                </div>

                <div className="w-full">
                  <Label className="text-sm font-medium text-gray-700 mb-1">Status</Label>
                  <select
                    value={status}
                    onChange={handleStatusChange}
                    className="w-full bg-gray-50 h-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>
          
              {/* Divider with Text */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white text-sm text-gray-500">
                    In Case of Emergency Contact Person
                  </span>
                </div>
              </div>
          
              {/* Contact Person Section */}
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-full">
                  <Label className="text-sm font-medium text-gray-700 mb-1">Contact Person Name</Label>
                  <span className="bg-gray-50 p-2 rounded-md border border-gray-300 block">
                    {ticket.contact_person_name}
                  </span>
                </div>
                <div className="w-full">
                  <Label className="text-sm font-medium text-gray-700 mb-1">Mobile Number</Label>
                  <span className="bg-gray-50 p-2 rounded-md border border-gray-300 block">
                    {ticket.contact_person_number}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case "Barangay Certificate":
        return (
          <div className="h-auto border-b border-gray-300 pb-6">
            <div className="grid w-full items-center">
              <Label className="text-sm font-medium text-gray-700 mb-1">Full Name</Label>
              <span className="bg-gray-50 p-2 rounded-md border border-gray-300 block">
                {ticket.name}
              </span>
            </div>
          
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-full">
                  <Label className="text-sm font-medium text-gray-700 mb-1">Age</Label>
                  <span className="bg-gray-50 p-2 rounded-md border border-gray-300 block">
                    {ticket.age}
                  </span>
                </div>
                <div className="w-full">
                  <Label className="text-sm font-medium text-gray-700 mb-1">Civil Status</Label>
                  <span className="bg-gray-50 p-2 rounded-md border border-gray-300 block">
                    {ticket.civil_status}
                  </span>
                </div>
                <div className="w-full">
                  <Label className="text-sm font-medium text-gray-700 mb-1">Purpose</Label>
                  <span className="bg-gray-50 p-2 rounded-md border border-gray-300 block">
                    {ticket.purpose}
                  </span>
                </div>
              </div>
          
              {/* Address Section */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <Label className="text-sm font-medium text-gray-700 mb-1">Address/Purok #</Label>
                  <span className="bg-gray-50 p-2 rounded-md border border-gray-300 block">
                    {ticket.address}
                  </span>
                </div>
                <div className="w-full">
                  <Label className="font-medium text-gray-700">Status</Label>
                  <div className="w-full p-2 border border-gray-300 rounded-md bg-gray-50">
                    <select
                      value={status}
                      onChange={handleStatusChange}
                      className="w-full bg-gray-50"
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "Barangay Clearance":
        return (
          <div className="h-auto space-y-6">
          {/* Full Name Section */}
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-gray-800">Full Name</Label>
            <div className="w-full p-2 border border-gray-300 rounded-md bg-gray-50">
              <span className="text-md text-gray-700">{ticket.name}</span>
            </div>
          </div>
        
          {/* Age, Purpose, and Status Section */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="grid w-full items-center gap-1.5">
              <Label className="font-medium text-gray-700">Age</Label>
              <div className="w-full p-2 border border-gray-300 rounded-md bg-gray-50">
                <span className="text-md text-gray-700">{ticket.age}</span>
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label className="font-medium text-gray-700">Purpose</Label>
              <div className="w-full p-2 border border-gray-300 rounded-md bg-gray-50">
                <span className="text-md text-gray-700">{ticket.purpose}</span>
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label className="font-medium text-gray-700">Status</Label>
              <div className="w-full p-2 border border-gray-300 rounded-md bg-gray-50">
                <select
                  value={status}
                  onChange={handleStatusChange}
                  className="w-full bg-gray-50"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
          </div>
        
          {/* Address Section */}
          <div className="grid w-full items-center gap-1.5">
            <Label className="font-medium text-gray-700">Address/Purok #</Label>
            <div className="w-full p-2 border border-gray-300 rounded-md bg-gray-50">
              <span className="text-md text-gray-700">{ticket.address}</span>
            </div>
          </div>
          </div>
        );
      case "Cedula":
        return (
          <div className="flex flex-col mx-auto h-auto container border-b border-gray-300 pb-6">
            {/* Responsive Grid Container */}
            <div className="grid w-full items-center mb-4">
              <Label className="text-sm font-medium text-gray-700 mb-1">Full Name</Label>
              <span className="bg-gray-50 p-2 rounded-md border border-gray-300 block">
                {ticket.name}
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {/* Responsive Flex Container */}
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-full">
                  <Label className="text-sm font-medium text-gray-700 mb-1">Birthdate</Label>
                  <span className="bg-gray-50 p-2 rounded-md border border-gray-300 block">
                    {ticket.birthdate ? ticket.birthdate : "January 01, 2025"}
                  </span>
                </div>
                <div className="w-full">
                  <Label className="text-sm font-medium text-gray-700 mb-1">Birthplace</Label>
                  <span className="bg-gray-50 p-2 rounded-md border border-gray-300 block">
                    {ticket.birthplace}
                  </span>
                </div>
                <div className="w-full">
                  <Label className="text-sm font-medium text-gray-700 mb-1">Age</Label>
                  <span className="bg-gray-50 p-2 rounded-md border border-gray-300 block">
                    {ticket.age}
                  </span>
                </div>
              </div>

              {/* Responsive Flex Container */}
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-full">
                  <Label className="text-sm font-medium text-gray-700 mb-1">Height</Label>
                  <span className="bg-gray-50 p-2 rounded-md border border-gray-300 block">
                    {ticket.height} cm
                  </span>
                </div>
                <div className="w-full">
                  <Label className="text-sm font-medium text-gray-700 mb-1">Weight</Label>
                  <span className="bg-gray-50 p-2 rounded-md border border-gray-300 block">
                    {ticket.weight} kg
                  </span>
                </div>
                <div className="w-full">
                  <Label className="text-sm font-medium text-gray-700 mb-1">Civil Status</Label>
                  <span className="bg-gray-50 p-2 rounded-md border border-gray-300 block">
                    {ticket.civil_status}
                  </span>
                </div>
              </div>

              {/* Responsive Grid Container */}
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-full">
                  <Label className="text-sm font-medium text-gray-700 mb-1">Address/Purok #</Label>
                  <span className="bg-gray-50 h-10 flex items-center rounded-md border border-gray-300 pl-2 block">
                    {ticket.address}
                  </span>
                </div>

                <div className="w-full">
                  <Label className="text-sm font-medium text-gray-700 mb-1">Status</Label>
                  <select
                    value={status}
                    onChange={handleStatusChange}
                    className="w-full bg-gray-50 h-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      case "Barangay Indigent":
        return (
          <div className="h-auto border-b border-gray-300 pb-6">

            <div className="grid w-full items-center mb-4">
              <Label className="text-sm font-medium text-gray-700 mb-1">Full Name</Label>
              <span className="bg-gray-50 p-2 rounded-md border border-gray-300 block">
                {ticket.name}
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-full">
                  <Label className="text-sm font-medium text-gray-700 mb-1">Age</Label>
                  <span className="bg-gray-50 p-2 rounded-md border border-gray-300 block">
                    {ticket.age}
                  </span>
                </div>
                <div className="w-full">
                  <Label className="text-sm font-medium text-gray-700 mb-1">Status</Label>
                  <span className="bg-gray-50 p-2 rounded-md border border-gray-300 block">
                    {ticket.status}
                  </span>
                </div>
                <div className="w-full">
                  <Label className="text-sm font-medium text-gray-700 mb-1">Purpose</Label>
                  <span className="bg-gray-50 p-2 rounded-md border border-gray-300 block">
                    {ticket.purpose}
                  </span>
                </div>
              </div>

              <div className="flex flex-row gap-4">
                <div className="w-full">
                  <Label className="text-sm font-medium text-gray-700 mb-1">Address/Purok #</Label>
                  <span className="bg-gray-50 p-2 rounded-md border border-gray-300 block">
                    {ticket.address}
                  </span>
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label className="font-medium text-gray-700">Status</Label>
                  <div className="w-full p-2 border border-gray-300 rounded-md bg-gray-50">
                    <select
                      value={status}
                      onChange={handleStatusChange}
                      className="w-full bg-gray-50"
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>
              </div>

            </div>
          </div>
        );
      case "Barangay Problem":
        return(
          <div className="h-auto">
          
            {/* Title Section */}
            <div className="grid w-full items-center mb-4">
              <Label className="text-sm font-medium text-gray-700 mb-1">Title</Label>
              <span className="bg-gray-50 p-2 rounded-md border border-gray-300 block">
                {ticket.title}
              </span>
            </div>
          
            {/* Description Section */}
            <div className="grid w-full items-center mb-4">
              <Label className="text-sm font-medium text-gray-700 mb-1">Description</Label>
              <span className="bg-gray-50 p-2 rounded-md border border-gray-300">
                {ticket.description}
              </span>
            </div>
          
            {/* Location Section */}
            <div className="flex flex-row gap-4 items-center mb-2">
              <div className="grid w-full items-center">
                <Label className="text-sm font-medium text-gray-700 mb-1">Location</Label>
                <span className="bg-gray-50 p-2 rounded-md border border-gray-300">
                  {ticket.location}
                </span>
              </div>
              <div className="w-full items-center gap-1.5">
                <Label className="font-medium text-gray-700">Status</Label>
                <div className="w-full p-2 border border-gray-300 rounded-md bg-gray-50">
                  <select
                    value={status}
                    onChange={handleStatusChange}
                    className="w-full bg-gray-50"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>
            </div>
          
            {/* Attachment 1 Section */}
            <div className="grid w-full items-center mb-4">
              <Label className="text-sm font-medium text-gray-700 mb-1">Attachment 1</Label>
              <img
                src={ticket.attachment_1}
                alt="Attachment 1"
                className="w-full max-w-md rounded-md border border-gray-300"
              />
            </div>
          
            {/* Attachment 2 Section */}
            <div className="grid w-full items-center mb-4">
              <Label className="text-sm font-medium text-gray-700 mb-1">Attachment 2</Label>
              <img
                src={ticket.attachment_2}
                alt="Attachment 2"
                className="w-full max-w-md rounded-md border border-gray-300"
              />
            </div>
          </div>
        )
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
            <DialogDescription className="text-sm text-gray-600">
              {ticket.created_at}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {renderContent()}
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
            <DrawerDescription className="text-sm text-gray-600">
              {ticket.created_at}
            </DrawerDescription>
          </DrawerHeader>
        <Separator />
        <div className="space-y-4 p-4 overflow-y-auto">
          {renderContent()}
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

