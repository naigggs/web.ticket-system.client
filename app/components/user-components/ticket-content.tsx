import React from 'react'

import { Label } from "@/components/ui/label";
import { TicketStatus } from "@/app/api/tickets/types";
import { Tickets } from './u-tickets/types';

interface TicketContentProps {
  ticket: Tickets;
  status: TicketStatus;
  onStatusChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function TicketContent({ ticket, status, onStatusChange }: TicketContentProps ) {
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
                      onChange={onStatusChange}
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
                        onChange={onStatusChange}
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
                    onChange={onStatusChange}
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
                      onChange={onStatusChange}
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
                        onChange={onStatusChange}
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
                      onChange={onStatusChange}
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
        default: return null;
    }
}