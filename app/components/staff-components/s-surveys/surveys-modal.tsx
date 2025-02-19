"use client";

import React from "react";
import { Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Survey } from "./types";

interface SurveyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  survey: Survey | null;
}

export const SurveysModal: React.FC<SurveyDetailModalProps> = ({
  isOpen,
  onClose,
  survey,
}) => {
  if (!survey) return null;

  const makeLinksClickable = (text: string): (string | JSX.Element)[] => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) =>
      urlRegex.test(part) ? (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {part}
        </a>
      ) : (
        part
      )
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95%] sm:max-w-[50%] max-h-[90vh] overflow-y-auto rounded-lg" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader className="border-b border-gray-300 pb-4">
          <DialogTitle className="text-2xl font-bold text-left">
            {survey.title}
          </DialogTitle>
          <span className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              Created on: {new Date(survey.created_at).toLocaleDateString()}
          </span>
        </DialogHeader>
        <DialogDescription className="text-gray-700">
          {makeLinksClickable(survey.description)}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};