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
  announcement: {
    title: string;
    description: string;
    subtitle: string;
    body: string;
    created_at: string;
  } | null;
  onClose: () => void;
}

export function AnnouncementModal({ announcement, onClose }: ModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (!announcement) return null;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="w-[95%] sm:max-w-[50%] max-h-[90vh] overflow-y-auto rounded-lg">
        <DialogHeader>
          <DialogTitle>{announcement?.title}</DialogTitle>
          <DialogDescription>{announcement?.description}</DialogDescription>
        </DialogHeader>
        <div className="font-bold text-md">{announcement?.subtitle}</div>
        <div className="text-sm">{announcement?.body}</div>
        <div className="mt-4 text-gray-500 text-sm flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          {announcement?.created_at}
        </div>
      </DialogContent>
    </Dialog>
  );
}
