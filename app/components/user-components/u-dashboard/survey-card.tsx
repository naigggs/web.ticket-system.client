'use client';

import React, { useEffect, useState } from "react";
import { Calendar, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Surveys } from "../u-surveys/types";
import { DashboardPagination } from "./dashboard-pagination";

export default function SurveyCard() {
  const [surveys, setSurveys] = useState<Surveys[]>([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const surveysPerPage = 5;

  const indexOfLastSurvey = currentPage * surveysPerPage;
  const indexOfFirstSurvey = indexOfLastSurvey - surveysPerPage;
  const currentSurvey = surveys.slice(indexOfFirstSurvey, indexOfLastSurvey);

  const totalPages = Math.ceil(surveys.length / surveysPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    async function fetchUserSurveys() {
      try {
        const response = await fetch(`/api/surveys`);
        if (!response.ok) {
          throw new Error("Failed to fetch announcement for user");
        }
        const data = await response.json();
        setSurveys(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    }

    fetchUserSurveys();
  }, []);
  return (
    
      <ul className="text-gray-500">
        <AnimatePresence>
          {currentSurvey.map((survey, index) => (
            <motion.li
              key={survey.id}
              className={`mb-4 ${index === 0 ? "" : ""}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow shadow-sm">
                <div className="flex flex-row justify-between h-full items-center space-y-2">
                  <div className="uppercase font-bold text-black text-lg">
                    {survey.title}
                  </div>
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
              </div>
            </motion.li>
          ))}
          <div className="flex justify-center">
            <DashboardPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </AnimatePresence>
      </ul>

  );
}
