"use client";

import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { SurveyDatePicker } from "@/app/components/admin-components/a-surveys/date-picker-surveys";
import { Input } from "@/components/ui/input";
import { CreateSurveys } from "./create-surveys";
import { createClient } from "@/utils/supabase/client";
import { SurveysModal } from "./surveys-modal";
import { Survey } from "./types";
import { SurveyPagination } from "./survey-pagination";

export default function SurveysTable() {
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const supabase = createClient();

  // Fetch surveys from the API
  const fetchSurveys = async () => {
    try {
      const response = await fetch("/api/surveys");
      if (!response.ok) {
        throw new Error("Failed to fetch surveys");
      }
      const data = await response.json();
      setSurveys(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveys();

    // Set up real-time subscription
    const subscription = supabase
      .channel("surveys-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "surveys" },
        (payload) => {
          switch (payload.eventType) {
            case "INSERT":
              setSurveys((prev) => [payload.new as Survey, ...prev]); // Prepend the new ticket
              break;
            case "UPDATE":
              setSurveys((prev) =>
                prev.map((ticket) =>
                  ticket.id === payload.new.id ? (payload.new as Survey) : ticket
                )
              );
              break;
            case "DELETE":
              setSurveys((prev) =>
                prev.filter((survey) => survey.id !== payload.old.id)
              );
              break;
          }
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  // Filter surveys based on search and date
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

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSurveys.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredSurveys.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSurveyClick = (survey: Survey) => {
    setSelectedSurvey(survey);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex flex-row justify-between h-full items-center mb-4">
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
          <CreateSurveys />
        </div>
      </div>
      <ul className="text-gray-500 w-full pb-4">
        {currentItems.map((survey, index) => (
          <li
            key={survey.id}
            className={`border-b py-5 px-5 hover:bg-gray-50 ${
              index === 0 ? "border-t" : ""
            }`}
            onClick={() => handleSurveyClick(survey)}
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
                {new Date(survey.created_at).toLocaleDateString()}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <SurveyPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <SurveysModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        survey={selectedSurvey}
      />
    </div>
  );
}