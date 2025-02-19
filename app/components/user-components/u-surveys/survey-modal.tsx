"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
import useMediaQuery from "@/hooks/use-media-query";

interface ModalProps {
  survey: {
    title: string;
    description: string;
    subtitle: string;
    body: string;
    created_at: string;
  } | null;
  onClose: () => void;
}

export function SurveyModal({ survey, onClose }: ModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
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

  if (isDesktop) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
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
  }
  return (
    <Drawer open={true} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{survey?.title}</DrawerTitle>
          <DrawerDescription className="max-h-[calc(100vh-200px)] overflow-y-auto">
            {survey?.description}
          </DrawerDescription>
        </DrawerHeader>
        <div className="text-md font-bold w-[92%] mx-auto">
          {survey?.title}
        </div>
        <div className="text-sm flex w-[92%] mx-auto">
          {" "}
          {survey?.description} {survey?.description}{" "}
          {survey?.description} {survey?.description}{" "}
        </div>
        <DrawerFooter className="pt-2"></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
