"use client";

import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { AnnouncementForm } from "./announcement-form";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function CreateAnnouncements() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { toast } = useToast();

  const handleSuccess = () => {
    setOpen(false);
      toast({
        title: "Success!",
        description: "Your announcement has been created.",
      });
    console.log('success')
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">New Announcement</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[40%]" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>New Announcement</DialogTitle>
          </DialogHeader>
          <AnnouncementForm onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default"><Plus/></Button>
      </DialogTrigger>
      <DialogContent className="w-[95%] sm:max-w-[40%] max-h-[90vh] overflow-y-auto rounded-lg">
        <DialogHeader>
          <DialogTitle>New Announcement</DialogTitle>
        </DialogHeader>
        <AnnouncementForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}

function DrawerFooter({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2 p-4">{children}</div>;
}