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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="default">
          <Plus />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-auto max-w-[100vw]">
        <DrawerHeader className="text-left">
          <DrawerTitle>New Announcement</DrawerTitle>
        </DrawerHeader>
        <AnnouncementForm className="px-4" onSuccess={handleSuccess} />
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function DrawerFooter({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2 p-4">{children}</div>;
}