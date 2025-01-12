"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TicketDatePicker } from "./date-picker-ticket.tsx";

type ContentType = "first" | "second" | null;

export default function SubmitTicket() {
  const [contentType, setContentType] = useState<ContentType>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleButtonClick = (type: ContentType) => {
    setContentType(type);
  };

  const resetContent = () => {
    setContentType(null);
  };

  const renderContent = () => {
    switch (contentType) {
      case "first":
        return (
          <div className={`container mx-auto ${!isDesktop ? "mt-6 mb-6" : ""}`}>
            <h2 className={`text-lg font-semibold`}>
              Report Problems or Concerns
            </h2>
            <div className="mt-4 space-y-5">
              <div className="grid w-full items-center gap-1.5">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label>Problem or Concern</Label>
                <Input type="text" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label>Additional Comments</Label>
                <Textarea />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label>Location</Label>
                <Input type="text" />
              </div>
              <div className="flex flex-row items-center gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label>Attachment 1</Label>
                  <Input type="file" />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label>Attachment 2</Label>
                  <Input type="file" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={resetContent}>
                  Reset
                </Button>
                <Button>Submit</Button>
              </div>
            </div>
          </div>
        );
      case "second":
        return (
          <div className={`container mx-auto ${!isDesktop ? "mt-6 mb-6" : ""}`}>
            <h2 className={`text-lg font-semibold`}>
              Report Problems or Concerns
            </h2>
            <div className="mt-4 space-y-5">
              <div className="grid w-full items-center gap-1.5">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-row items-center gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label>Last Name</Label>
                  <Input type="text" />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label>First Name</Label>
                  <Input type="text" />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label>Middle Name</Label>
                  <Input type="text" />
                </div>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label>Address</Label>
                <Input type="text" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label>Birthdate</Label>
                <TicketDatePicker onDateChange={setSelectedDate} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={resetContent}>
                  Reset
                </Button>
                <Button>Submit</Button>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className={`container mx-auto ${!isDesktop ? "mt-6 mb-6" : ""}`}>
            <h2 className={`text-lg font-semibold`}>Submit a Ticket</h2>
            <p className="mb-4 text-sm text-gray-800">
              What kind of assistance do you need? Let us know how we can
              support you, whether it&apos;s resolving an issue, answering your
              questions, or providing guidance.
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={() => handleButtonClick("first")}>
                Report a Problem
              </Button>
              <Button onClick={() => handleButtonClick("second")}>
                Request Services
              </Button>
            </div>
          </div>
        );
    }
  };

  if (isDesktop)
    return (
      <Dialog onOpenChange={(open) => open && resetContent()}>
        <DialogTrigger asChild>
          <Button className="w-full">Submit Ticket</Button>
        </DialogTrigger>
        <DialogTitle></DialogTitle>
        <DialogContent className="max-w-[700px]">
          {renderContent()}
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer onOpenChange={(open) => open && resetContent()}>
      <DrawerTrigger asChild>
        <Button className="w-full">Submit Ticket</Button>
      </DrawerTrigger>
      <DrawerContent className="px-10">{renderContent()}</DrawerContent>
    </Drawer>
  );
}