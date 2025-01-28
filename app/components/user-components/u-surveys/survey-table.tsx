"use client";

import React, { useEffect, useState } from "react";
import { surveys } from "@/app/data/u-dash";
import { Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SurveyDatePicker } from "./date-picker-survey";
import { Input } from "@/components/ui/input";
import { Surveys } from "./types";
import { SurveyModal } from "./survey-modal";
import { SurveyPagination } from "./survey-pagination";

export default function SurveysTable() {
  const [surveys, setSurveys] = useState<Surveys[]>([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSurvey, setSelectedSurvey] = useState<any | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    async function fetchUserUnansweredSurveys() {
      try {
        const response = await fetch(`/api/surveys/user-unanswered`);
        if (!response.ok) {
          throw new Error("Failed to fetch tickets for user");
        }
        const data = await response.json();
        setSurveys(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    }
    fetchUserUnansweredSurveys();
  }, []);

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

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedDate]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSurveys.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredSurveys.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="flex flex-row justify-between h-full items-center mb-6 mt-4">
        <h2 className="text-2xl font-semibold ml-4">Surveys</h2>
        <div className="flex flex-row items-center gap-2">
          <div>
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>
            <SurveyDatePicker onDateChange={setSelectedDate} />
          </div>
          <div></div>
        </div>
      </div>
      <ul className="text-gray-500">
        <AnimatePresence>
          {currentItems.map((survey, index) => (
            <motion.li
              key={survey.id}
              className={`border-b py-5 px-5 hover:bg-gray-50 ${
                index === 0 ? "border-t" : ""
              }`}
              onClick={() => setSelectedSurvey(survey)}
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
                  {new Date(survey.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                </span>
              </div>
            </motion.li>
          ))}
          <div className="mt-4">
            <SurveyPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </AnimatePresence>
        
      </ul>
      <SurveyModal
          survey={selectedSurvey}
          onClose={() => setSelectedSurvey(null)}
        />
    </div>
  );
}
