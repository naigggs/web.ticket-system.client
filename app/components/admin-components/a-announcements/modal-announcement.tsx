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
    created_at: string;
  } | null;
  onClose: () => void;
}

export function AnnouncementModal({ announcement, onClose }: ModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (!announcement) return null;

  if (isDesktop) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>{announcement?.title}</DialogTitle>
            <DialogDescription>{announcement?.description}</DialogDescription>
          </DialogHeader>
          <div className="mt-4 text-gray-500 text-sm flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {announcement?.created_at}
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={true} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{announcement?.title}</DrawerTitle>
          <DrawerDescription className="max-h-[calc(100vh-200px)] overflow-y-auto">
            {announcement?.description}
          </DrawerDescription>
        </DrawerHeader>
        <div className="text-md font-bold w-[92%] mx-auto">{announcement?.title}</div>
        <div className="text-sm flex w-[92%] mx-auto">
          {" "}
          {announcement?.description} {announcement?.description}{" "}
          {announcement?.description} {announcement?.description}{" "}
        </div>
        <DrawerFooter className="pt-2"></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
