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

  if (isDesktop) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{survey?.title}</DialogTitle>
            <DialogDescription>{survey?.description}</DialogDescription>
          </DialogHeader>
          <div className="font-bold text-md">{survey?.subtitle}</div>
          <div className="text-sm">{survey?.body}</div>
          <div className="mt-4 text-gray-500 text-sm flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {survey?.created_at}
          </div>
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
