"use client";

import React from "react";
import { Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg" onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader className="border-b border-gray-300 pb-4">
          <DialogTitle className="text-2xl font-bold">
            {survey.title}
          </DialogTitle>
          <span className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              Created on: {new Date(survey.created_at).toLocaleDateString()}
          </span>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-gray-700">{survey.description}</p>
          <div className="text-gray-500 text-sm">
            
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};