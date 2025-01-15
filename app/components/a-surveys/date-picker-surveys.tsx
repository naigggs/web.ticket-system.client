"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

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
  const isDesktop = useMediaQuery("(min-width: 768px)");
  useEffect(() => {
    onDateChange(date);
  }, [date, onDateChange]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-auto md:w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="h-4 w-4" />
          {isDesktop && (
            <span className="ml-2">
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </span>
          )}
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