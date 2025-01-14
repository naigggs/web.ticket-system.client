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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

export function CreateAnnouncements() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">New Announcement</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Announcement</DialogTitle>
          </DialogHeader>
          <AnnouncementForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="default">New Announcement</Button>
      </DrawerTrigger>
      <DrawerContent className="h-auto max-w-[100vw]">
        <DrawerHeader className="text-left">
          <DrawerTitle>New Announcement</DrawerTitle>
        </DrawerHeader>
        <AnnouncementForm className="px-4" />
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function AnnouncementForm({ className }: React.ComponentProps<"form">) {
  // Replace `cn` with a regular string concatenation or template literals
  const formClassName = `grid items-start gap-4 ${className || ""}`;

  return (
    <form className={formClassName}>
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" placeholder="Enter announcement title" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <textarea
            className="w-full p-2 border rounded mt-1"
            placeholder="Description..."
            rows={4}
        />
      </div>
      <Button type="submit">Create Announcement</Button>
    </form>
  );
}

function DrawerFooter({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2 p-4">{children}</div>;
}