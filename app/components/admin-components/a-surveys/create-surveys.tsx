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
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export function CreateSurveys() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">Create Survey</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[60%] lg:max-w-[50%] mmax-h-[80%] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Survey</DialogTitle>
          </DialogHeader>
          <SurveyForm className="w-full" onSuccess={() => setOpen(false)} />
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
      <DrawerContent className="max-h-[90%]">
        <DrawerHeader className="text-left">
          <DrawerTitle>Create Survey</DrawerTitle>
        </DrawerHeader>
        <SurveyForm className="px-4 overflow-y-auto" onSuccess={() => setOpen(false)} />
      </DrawerContent>
    </Drawer>
  );
}

interface SurveyFormProps extends React.ComponentProps<"form"> {
  onSuccess: () => void;
}

function SurveyForm({ className, onSuccess }: SurveyFormProps) {
  const router = useRouter();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/surveys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        throw new Error("Failed to create survey");
      }

      const data = await response.json();
      console.log("Survey created:", data);

      // Reset form and close dialog/drawer
      setTitle("");
      setDescription("");
      onSuccess(); // Close the dialog/drawer
      router.refresh(); // Refresh the page to show the new survey
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Survey Title</Label>
          <Input
            id="title"
            placeholder="Enter survey title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="focus-visible:ring-0"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <textarea
            className="w-full p-2 border rounded mt-1 focus:outline-0"
            id="description"
            placeholder="Enter survey description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Survey"}
        </Button>
      </div>
    </form>
  );
}