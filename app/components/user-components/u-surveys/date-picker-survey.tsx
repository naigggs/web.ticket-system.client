"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SurveyDatePickerProps } from "./types";

export function SurveyDatePicker({
  onDateChange,
}: Readonly<SurveyDatePickerProps>) {
  const [date, setDate] = useState<Date | null>(null);
  console.log(date);

  useEffect(() => {
    onDateChange(date);
  }, [date, onDateChange]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          <span className="md:block hidden">   {date ? format(date, "PPP") : <span>Pick a date</span>} </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date ?? undefined}
          onSelect={(day) => setDate(day ?? null)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
