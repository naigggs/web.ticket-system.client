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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TicketDatePicker } from "./date-picker-ticket";
import {
  submitBarangayID,
  submitBarangayCert,
  submitBarangayClearance,
  submitCedula,
  submitBarangayIndigent,
  submitBarangayProblem,
} from "@/app/api/tickets/actions";

type ContentType = "first" | "second" | null;

export default function SubmitTicket() {
  const [concernType, setConcernType] = useState<string | null>("barangay-id");
  const [contentType, setContentType] = useState<ContentType>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleButtonClick = (type: ContentType) => {
    setContentType(type);
  };

  const resetContent = () => {
    setContentType(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      if (contentType === "first") {
        await submitBarangayProblem(formData);
      } else {
        switch (concernType) {
          case "barangay-id":
            await submitBarangayID(formData);
            break;
          case "barangay-cert":
            await submitBarangayCert(formData);
            break;
          case "barangay-clearance":
            await submitBarangayClearance(formData);
            break;
          case "cedula":
            await submitCedula(formData);
            break;
          case "barangay-indigent":
            await submitBarangayIndigent(formData);
            break;
          default:
            throw new Error("Invalid concern type");
        }
      }
      resetContent();
    } catch (error) {
      console.error("Error submitting ticket:", error);
    }
  };

  const renderContent = () => {
    switch (contentType) {
      case "first":
        return (
          <form onSubmit={handleSubmit} className="container mx-auto">
            <h2 className="text-lg font-semibold">
              Report Problems or Concerns
            </h2>
            <div className="mt-4 space-y-5">
              <div className="grid w-full items-center gap-1.5">
                <Label>Problem or Concern</Label>
                <Input type="text" name="title" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label>Additional Comments</Label>
                <Textarea name="description" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label>Location</Label>
                <Input type="text" name="location" />
              </div>
              <div className="flex flex-row items-center gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label>Attachment 1</Label>
                  <Input type="file" name="attachment1" />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label>Attachment 2</Label>
                  <Input type="file" name="attachment2" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={resetContent}>
                  Reset
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </div>
          </form>
        );
      case "second":
        return (
          <form onSubmit={handleSubmit} className="container mx-auto">
            <h2 className="text-lg font-semibold">
              Request Services or Assistance
            </h2>
            <div className="mt-4 space-y-5">
              <div className="grid w-full items-center gap-1.5">
                <Label>Concern</Label>
                <Select onValueChange={(value) => setConcernType(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type of Concern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Concerns</SelectLabel>
                      <SelectItem value="barangay-id">Barangay ID</SelectItem>
                      <SelectItem value="barangay-cert">
                        Barangay Certificate
                      </SelectItem>
                      <SelectItem value="barangay-clearance">
                        Barangay Clearance
                      </SelectItem>
                      <SelectItem value="cedula">Cedula</SelectItem>
                      <SelectItem value="barangay-indigent">
                        Barangay Indigent
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {concernType === "barangay-id" && (
                <div className="h-auto">
                  <div className="flex flex-row items-center gap-4">
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Last Name</Label>
                      <Input type="text" name="lastName" />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>First Name</Label>
                      <Input type="text" name="firstName" />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Middle Name</Label>
                      <Input type="text" name="middleName" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="flex flex-row items-center gap-4">
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Birthdate</Label>
                        <TicketDatePicker
                          onDateChange={(date) => setSelectedDate(date)}
                        />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Birthplace</Label>
                        <Input type="text" name="birthplace" />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Age</Label>
                        <Input type="number" name="age" />
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-4">
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Height</Label>
                        <Input type="text" name="height" />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Weight</Label>
                        <Input type="text" name="weight" />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Civil Status</Label>
                        <Input type="text" name="civilStatus" />
                      </div>
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Address/Purok #</Label>
                      <Input type="text" name="address" />
                    </div>
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
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Contact Person Name</Label>
                        <Input type="text" name="contactPersonName" />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Mobile Number</Label>
                        <Input type="tel" pattern="[0-9]*" name="contactPersonNumber" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="secondary" onClick={resetContent}>
                      Reset
                    </Button>
                    <Button type="submit">Submit</Button>
                  </div>
                </div>
              )}
              {concernType === "barangay-cert" && (
                <div className="h-auto">
                  <div className="flex flex-row items-center gap-4">
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Last Name</Label>
                      <Input type="text" name="lastName" />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>First Name</Label>
                      <Input type="text" name="firstName" />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Middle Name</Label>
                      <Input type="text" name="middleName" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="flex flex-row items-center gap-4">
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Age</Label>
                        <Input type="number" name="age" />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Civil Status</Label>
                        <Input type="text" name="civilStatus" />
                      </div>
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Address/Purok #</Label>
                      <Input type="text" name="address" />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Purpose</Label>
                      <Input type="text" name="purpose" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="secondary" onClick={resetContent}>
                      Reset
                    </Button>
                    <Button type="submit">Submit</Button>
                  </div>
                </div>
              )}
              {concernType === "barangay-clearance" && (
                <div className="h-auto">
                  <div className="flex flex-row items-center gap-4">
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Last Name</Label>
                      <Input type="text" name="lastName" />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>First Name</Label>
                      <Input type="text" name="firstName" />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Middle Name</Label>
                      <Input type="text" name="middleName" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="flex flex-row items-center gap-4">
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Age</Label>
                        <Input type="number" name="age" />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Status</Label>
                        <Input type="text" name="status" />
                      </div>
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Address/Purok #</Label>
                      <Input type="text" name="address" />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Purpose</Label>
                      <Input type="text" name="purpose" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="secondary" onClick={resetContent}>
                      Reset
                    </Button>
                    <Button type="submit">Submit</Button>
                  </div>
                </div>
              )}
              {concernType === "cedula" && (
                <div className="h-auto">
                  <div className="flex flex-row items-center gap-4">
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Last Name</Label>
                      <Input type="text" name="lastName" />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>First Name</Label>
                      <Input type="text" name="firstName" />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Middle Name</Label>
                      <Input type="text" name="middleName" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="flex flex-row items-center gap-4">
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Birthdate</Label>
                        <TicketDatePicker
                          onDateChange={(date) => setSelectedDate(date)}
                        />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Birthplace</Label>
                        <Input type="text" name="birthplace" />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Age</Label>
                        <Input type="number" name="age" />
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-4">
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Height</Label>
                        <Input type="text" name="height" />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Weight</Label>
                        <Input type="text" name="weight" />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Civil Status</Label>
                        <Input type="text" name="civilStatus" />
                      </div>
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Address/Purok #</Label>
                      <Input type="text" name="address" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="secondary" onClick={resetContent}>
                      Reset
                    </Button>
                    <Button type="submit">Submit</Button>
                  </div>
                </div>
              )}
              {concernType === "barangay-indigent" && (
                <div className="h-auto">
                  <div className="flex flex-row items-center gap-4">
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Last Name</Label>
                      <Input type="text" name="lastName" />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>First Name</Label>
                      <Input type="text" name="firstName" />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Middle Name</Label>
                      <Input type="text" name="middleName" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="flex flex-row items-center gap-4">
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Age</Label>
                        <Input type="number" name="age" />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Status</Label>
                        <Input type="text" name="status" />
                      </div>
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Address/Purok #</Label>
                      <Input type="text" name="address" />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Purpose</Label>
                      <Input type="text" name="purpose" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="secondary" onClick={resetContent}>
                      Reset
                    </Button>
                    <Button type="submit">Submit</Button>
                  </div>
                </div>
              )}
            </div>
          </form>
        );
      default:
        return (
          <div className="container mx-auto">
            <h2 className="text-lg font-semibold">Submit a Ticket</h2>
            <p className="mb-4 text-sm text-gray-800">
              What kind of assistance do you need? Let us know how we can
              support you.
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

  return (
    <>
      {isDesktop ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Submit Ticket</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[700px]">
            {renderContent()}
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="w-full">Submit Ticket</Button>
          </DrawerTrigger>
          <DrawerContent className="px-10 mb-4">
            {renderContent()}
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}