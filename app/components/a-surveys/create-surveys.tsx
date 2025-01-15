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
import { Plus, Minus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export function CreateSurveys() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant="default">Create Survey</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[80%] max-w-[95%] max-h-[80%] overflow-y-auto">
            <DialogHeader>
            <DialogTitle>Create Survey</DialogTitle>
            </DialogHeader>
            <SurveyForm className="w-full" />
        </DialogContent>
        </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="default"><Plus /></Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[90%]">
        <DrawerHeader className="text-left">
          <DrawerTitle>Create Survey</DrawerTitle>
        </DrawerHeader>
        <SurveyForm className="px-4 max-h-[80%] overflow-y-auto pb-6" />
        {/* <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
}

function SurveyForm({ className }: React.ComponentProps<"form">) {
    const [questions, setQuestions] = React.useState([{ id: 1, value: "" }]);
  
    const addQuestion = () => {
      setQuestions([...questions, { id: questions.length + 1, value: "" }]);
    };
  
    const removeQuestion = () => {
      if (questions.length > 1) {
        setQuestions(questions.slice(0, -1)); // Remove the last question
      }
    };
  
    const handleQuestionChange = (id: number, value: string) => {
      setQuestions(questions.map((q) => (q.id === id ? { ...q, value } : q)));
    };
  
    const formClassName = `grid items-start gap-4 ${className || ""}`;
  
    return (
      <form className={formClassName}>
        <div className="grid gap-2">
          <Label htmlFor="title">Survey Title</Label>
          <Input id="title" placeholder="Enter survey title" />
        </div>
  
        {questions.map((question) => (
          <div key={question.id} className="grid gap-2">
            <Label htmlFor={`question-${question.id}`}>Question {question.id}</Label>
            <Textarea
              id={`question-${question.id}`}
              placeholder={`Enter question ${question.id}`}
              value={question.value}
              onChange={(e) => handleQuestionChange(question.id, e.target.value)}
              rows={3}
            />
          </div>
        ))}
  
        <div className="flex justify-between">
          <Button
            type="button"
            variant="destructive"
            onClick={removeQuestion}
            disabled={questions.length <= 1} // Disable if only one question remains
          >
            <Minus className="mr-2 h-4 w-4" /> Remove Question
          </Button>
          <Button type="button" className="bg-blue-500 hover:bg-blue-600 text-white" onClick={addQuestion}>
            <Plus className="mr-2 h-4 w-4" /> Add Question
          </Button>
        </div>
  
        <Button type="submit">Create Survey</Button>
      </form>
    );
}

function DrawerFooter({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2 p-4">{children}</div>;
}