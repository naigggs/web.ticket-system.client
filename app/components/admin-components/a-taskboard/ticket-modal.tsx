"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { useMediaQuery } from "@/hooks/use-media-query";
import { getBadgeColor } from "../badge-color";
import { Tickets } from "./types.js";
import { createClient } from "@/utils/supabase/client";
import { TicketStatus } from "@/app/api/tickets/types";
import { TicketContent } from "../ticket-content";
import { addComment } from "@/app/api/tickets/comments/actions";
import { assignTicket } from "@/app/api/tickets/actions";

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: Tickets | null;
}

export function TicketModal({ isOpen, onClose, ticket }: TicketModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [status, setStatus] = useState<TicketStatus>("Open");
  const [comments, setComments] = useState<any[]>([]);
  const [error, setError] = useState("");
  const supabase = createClient();

  const fetchComments = async () => {
    if (!ticket) return;

    try {
      const { data, error } = await supabase
        .from("ticket-comments")
        .select("*, user_id(*)")
        .eq("ticket_id", ticket.id)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }
      setComments(data || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
  };

  useEffect(() => {
    if (ticket) {
      fetchComments();

      // Subscribe to real-time updates
      const subscription = supabase
        .channel("ticket-comments")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "ticket-comments" },
          (payload) => {
            console.log("Payload received:", payload);
            if (payload.new.ticket_id === ticket.id) {
              setComments((prevComments) => [payload.new, ...prevComments]);
            }
          }
        )
        .subscribe();

      // Cleanup subscription when the component unmounts
      return () => {
        supabase.removeChannel(subscription);
      };
    }
  }, [ticket]);

  const handleCommentSubmit = async () => {
    if (!ticket) return;

    const commentText = (
      document.querySelector("textarea") as HTMLTextAreaElement
    ).value;

    if (!commentText) {
      alert("Please enter a comment.");
      return;
    }

    try {
      await addComment({
        ticket_id: ticket.id.toString(),
        comment: commentText,
      });

      (document.querySelector("textarea") as HTMLTextAreaElement).value = "";
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!ticket) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-[90vw] sm:w-full max-h-[90vh] overflow-y-auto rounded-lg">
        <DialogHeader className="text-left space-y-2 border-b border-gray-300 pb-4">
          <DialogTitle className="flex items-center gap-x-2">
            <div className="text-xl font-bold">Ticket - {ticket.id}</div>
            <Badge
              className={`${getBadgeColor(
                status
              )} h-6 px-2 flex items-center justify-center rounded-full whitespace-nowrap text-[10px] uppercase font-bold shrink-0 pointer-events-none`}
            >
              {status}
            </Badge>
          </DialogTitle>
          <DialogTitle className="text-lg">{ticket.concern_type}</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            {ticket.created_at}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <TicketContent 
            ticket={ticket} 
            status={status} 
            onStatusChange={(event) => setStatus(event.target.value as TicketStatus)} 
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Comment
            </label>
            <textarea
              className="w-full p-2 border rounded mt-1"
              placeholder="Add comment or note"
              rows={3}
            />
          </div>
          <div className="flex justify-between">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
            <Button onClick={handleCommentSubmit}>Send</Button>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Comments</h3>
            {comments.map((comment, index) => (
              <div key={index} className="mt-2 p-2 border rounded">
                <p className="text-sm text-gray-600">{comment.comment}</p>
                <p className="text-xs text-gray-400">
                  {comment.user_id?.first_name} {comment.user_id?.last_name}
                </p>
                <p className="text-xs text-gray-400">{comment.created_at}</p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
