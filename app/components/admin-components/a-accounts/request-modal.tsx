import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { useMediaQuery } from "@/hooks/use-media-query";
import { Label } from "@/components/ui/label";
import { Accounts } from "./types";

interface RequestModalProps {
    account: Accounts;
    open: boolean; 
    onClose: () => void;  
    handleDecline: (account: Accounts) => void; 
    handleAccept: (account: Accounts) => void; 
}
  
export function RequestModal({ account, open, onClose, handleDecline, handleAccept }: RequestModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const Content = (
    <div className="grid gap-4 overflow-y-auto h-[80vh]">
      <div className="grid gap-2">
        <Label>Full Name</Label>
        <p className="border p-2 rounded-md">{account.full_name}</p>
      </div>
      <div className="grid gap-2">
        <Label>Email</Label>
        <p className="border p-2 rounded-md">{account.email}</p>
      </div>
      <div className="grid gap-2">
        <Label>Address</Label>
        <p className="border p-2 rounded-md">{account.location}</p>
      </div>
      <div className="grid gap-2">
        <Label>Front ID</Label>
        <img
          src={account.document_1}
          alt="Front ID"
          className="w-full max-w-md rounded-md border border-gray-300"
        />
      </div>
      <div className="grid gap-2">
        <Label>Back ID</Label>
          <img
            src={account.document_2}
            alt="Front ID"
            className="w-full max-w-md rounded-md border border-gray-300"
          />
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogTrigger asChild>
          <Button variant="outline">View Details</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px]" onOpenAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Account Details</DialogTitle>
            <DialogDescription>Created at: {new Date(account.created_at).toLocaleDateString()}</DialogDescription>
          </DialogHeader>
          {Content}
          <DialogFooter>
            <div className="flex flex-row justify-between w-full">
              <Button variant="outline" className="bg-red-500 text-white hover:text-black" onClick={() => handleDecline(account)}>Decline</Button>
              <Button variant="outline" className="bg-blue-500 text-white hover:text-black" onClick={() => handleAccept(account)}>Accept</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerTrigger asChild>
        <Button variant="outline">View Details</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Account Details</DrawerTitle>
          <DrawerDescription>Created at: {new Date(account.created_at).toLocaleDateString()}</DrawerDescription>
        </DrawerHeader>
        <div className="px-3">{Content}</div>
        <DrawerFooter className="pt-2">
          <div className="flex flex-row justify-between w-full">
            <Button variant="outline" className="bg-red-500 text-white hover:text-black" onClick={() => handleDecline(account)}>Decline</Button>
            <Button variant="outline" className="bg-blue-500 text-white hover:text-black" onClick={() => handleAccept(account)}>Accept</Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
