// AccountModal.tsx
"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Accounts } from "./types";

interface ManageModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: Accounts | null;
}

export function ManageModal({ isOpen, onClose, account }: ManageModalProps) {
  if (!account) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Account</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              value={account.email}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
          <input
              type="text"
              value={account.password}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
            />
            <input
              type="text"
              value={account.created_at}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
            />
            <input
              type="text"
              value={account.status}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
            />
            <img
              src={account.document_1}
              alt="Document 1"
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
            />
            <img
              src={account.document_2}
              alt="Document 2"
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
            />
                <input
              type="text"
              value={account.full_name}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
            />
                <input
              type="text"
              value={account.location}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
            />
          {/* Add more fields for editing here */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={() => alert("Save changes")}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}