"use client";

import React, { useState } from "react";
import { surveys } from "@/app/data/u-dash";
import { Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SurveyDatePicker } from "@/app/components/admin-components/a-surveys/date-picker-surveys";
import { Input } from "@/components/ui/input";
import { CreateSurveys } from "./create-surveys";

export default function SurveysTable() {
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const filteredSurveys = surveys.filter((survey) => {
    const matchesDate =
      !selectedDate ||
      new Date(survey.created_at).toDateString() ===
        selectedDate.toDateString();
    const matchesSearch = survey.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesDate && matchesSearch;
  });

  return (
    <div>
      <div className="flex flex-row justify-between h-full items-center mb-6 mt-4">
        <h2 className="text-2xl font-semibold ml-4">Surveys</h2>
        <div className="flex flex-row items-center gap-2 p-2">
          <div>
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[150px] md:w-full"
            />
          </div>
            <SurveyDatePicker onDateChange={setSelectedDate} />
            <CreateSurveys/>
        </div>
      </div>
      <ul className="text-gray-500 w-full">
        <AnimatePresence>
          {filteredSurveys.map((survey, index) => (
            <motion.li
              key={survey.id}
              className={`border-b py-5 px-5 hover:bg-gray-50 ${
                index === 0 ? "border-t" : ""
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="uppercase font-bold text-black hover:underline">
                {survey.title}
              </div>

              <div className="text-sm my-2 line-clamp-3">
                {survey.description}
              </div>
              <div>
                <span className="text-gray-400 text-sm flex flex-row items-center">
                  <Calendar className="h-3.5 -mt-0.5 w-auto mr-1" />
                  {survey.created_at}
                </span>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
