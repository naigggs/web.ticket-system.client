"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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
import { TicketDatePicker } from "./date-picker-ticket";
import {
  submitBarangayID,
  submitBarangayCert,
  submitBarangayClearance,
  submitCedula,
  submitBarangayIndigent,
} from "@/app/api/tickets/actions";

type FormData = {
  lastName: string;
  firstName: string;
  middleName: string;
  birthdate?: string;
  birthplace?: string;
  age?: number;
  height?: string;
  weight?: string;
  civilStatus?: string;
  address?: string;
  contactPersonName?: string;
  contactPersonNumber?: string;
  purpose?: string;
  status?: string;
  problem?: string;
  comments?: string;
  location?: string;
  attachment1?: FileList;
  attachment2?: FileList;
};

type ContentType = "first" | "second" | null;

export default function SubmitTicket() {
  const [concernType, setConcernType] = useState<string | null>("barangay-id");
  const [contentType, setContentType] = useState<ContentType>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { register, handleSubmit, reset } = useForm<FormData>();

  const handleButtonClick = (type: ContentType) => {
    setContentType(type);
  };

  const resetContent = () => {
    setContentType(null);
    reset();
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      switch (concernType) {
        case "barangay-id":
          await submitBarangayID(data);
          break;
        case "barangay-cert":
          await submitBarangayCert(data);
          break;
        case "barangay-clearance":
          await submitBarangayClearance(data);
          break;
        case "cedula":
          await submitCedula(data);
          break;
        case "barangay-indigent":
          await submitBarangayIndigent(data);
          break;
        default:
          throw new Error("Invalid concern type");
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
          <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto">
            <h2 className="text-lg font-semibold">
              Report Problems or Concerns
            </h2>
            <div className="mt-4 space-y-5">
              <div className="grid w-full items-center gap-1.5">
                <Label>Problem or Concern</Label>
                <Input type="text" {...register("problem")} />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label>Additional Comments</Label>
                <Textarea {...register("comments")} />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label>Location</Label>
                <Input type="text" {...register("location")} />
              </div>
              <div className="flex flex-row items-center gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label>Attachment 1</Label>
                  <Input type="file" {...register("attachment1")} />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label>Attachment 2</Label>
                  <Input type="file" {...register("attachment2")} />
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
          <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto">
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
                      <Input type="text" {...register("lastName")} />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>First Name</Label>
                      <Input type="text" {...register("firstName")} />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Middle Name</Label>
                      <Input type="text" {...register("middleName")} />
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
                        <Input type="text" {...register("birthplace")} />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Age</Label>
                        <Input type="number" {...register("age")} />
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-4">
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Height</Label>
                        <Input type="text" {...register("height")} />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Weight</Label>
                        <Input type="text" {...register("weight")} />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Civil Status</Label>
                        <Input type="text" {...register("civilStatus")} />
                      </div>
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Address/Purok #</Label>
                      <Input type="text" {...register("address")} />
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
                        <Input type="text" {...register("contactPersonName")} />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Mobile Number</Label>
                        <Input
                          type="tel"
                          pattern="[0-9]*"
                          {...register("contactPersonNumber")}
                        />
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
                      <Input type="text" {...register("lastName")} />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>First Name</Label>
                      <Input type="text" {...register("firstName")} />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Middle Name</Label>
                      <Input type="text" {...register("middleName")} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="flex flex-row items-center gap-4">
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Age</Label>
                        <Input type="number" {...register("age")} />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Civil Status</Label>
                        <Input type="text" {...register("civilStatus")} />
                      </div>
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Address/Purok #</Label>
                      <Input type="text" {...register("address")} />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Purpose</Label>
                      <Input type="text" {...register("purpose")} />
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
                      <Input type="text" {...register("lastName")} />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>First Name</Label>
                      <Input type="text" {...register("firstName")} />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Middle Name</Label>
                      <Input type="text" {...register("middleName")} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="flex flex-row items-center gap-4">
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Age</Label>
                        <Input type="number" {...register("age")} />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Status</Label>
                        <Input type="text" {...register("status")} />
                      </div>
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Address/Purok #</Label>
                      <Input type="text" {...register("address")} />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Purpose</Label>
                      <Input type="text" {...register("purpose")} />
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
                      <Input type="text" {...register("lastName")} />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>First Name</Label>
                      <Input type="text" {...register("firstName")} />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Middle Name</Label>
                      <Input type="text" {...register("middleName")} />
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
                        <Input type="text" {...register("birthplace")} />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Age</Label>
                        <Input type="number" {...register("age")} />
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-4">
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Height</Label>
                        <Input type="text" {...register("height")} />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Weight</Label>
                        <Input type="text" {...register("weight")} />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Civil Status</Label>
                        <Input type="text" {...register("civilStatus")} />
                      </div>
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Address/Purok #</Label>
                      <Input type="text" {...register("address")} />
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
                      <Input type="text" {...register("lastName")} />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>First Name</Label>
                      <Input type="text" {...register("firstName")} />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Middle Name</Label>
                      <Input type="text" {...register("middleName")} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="flex flex-row items-center gap-4">
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Age</Label>
                        <Input type="number" {...register("age")} />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label>Status</Label>
                        <Input type="text" {...register("status")} />
                      </div>
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Address/Purok #</Label>
                      <Input type="text" {...register("address")} />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label>Purpose</Label>
                      <Input type="text" {...register("purpose")} />
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
