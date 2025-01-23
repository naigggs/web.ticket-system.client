"use client";

import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SurveyDatePicker } from "@/app/components/admin-components/a-surveys/date-picker-surveys";
import { Input } from "@/components/ui/input";
import { CreateSurveys } from "./create-surveys";
import { createClient } from "@/utils/supabase/client";
import { SurveysModal } from "./surveys-modal";
import { Survey } from "./types";

export default function SurveysTable() {
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleSurveyClick = (survey: Survey) => {
    setSelectedSurvey(survey);
    setIsModalOpen(true);
  };

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
          <CreateSurveys />
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
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <SurveysModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        survey={selectedSurvey}
      />
      
    </div>
  );
}