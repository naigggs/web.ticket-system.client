import * as React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Label } from "@/components/ui/label";

interface UserDetailViewProps {
  user: {
    user_id: string;
    first_name: string;
    last_name: string;
    age: number;
    location: string;
    document_1: string;
    document_2: string;
    created_at: string;
  };
}

export function ManageModal({ user }: UserDetailViewProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">Edit</Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl w-[90vw] sm:w-full max-h-[90vh] overflow-y-auto rounded-lg" onOpenAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Detailed information about the user.
            </DialogDescription>
          </DialogHeader>
          <UserDetailForm user={user} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">Edit</Button>
      </DrawerTrigger>
      <DrawerContent className="w-full px-2">
        <DrawerHeader className="text-left">
          <DrawerTitle>User Details</DrawerTitle>
          <DrawerDescription>
            Detailed information about the user.
          </DrawerDescription>
        </DrawerHeader>
        <UserDetailForm user={user}/>
        <DrawerFooter className="pt-2 w-full">
          {/* <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose> */}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function UserDetailForm({
  user,
  className,
}: UserDetailViewProps & React.ComponentProps<"div">) {
  return (
    <div className="h-auto overflow-y-auto">
      <div className="flex flex-row gap-4">
        <div className="grid w-full items-center mb-4">
          <Label className="text-sm font-medium text-gray-700 mb-1" htmlFor="first_name">First Name</Label>
          <span className="bg-gray-50 p-2 rounded-md border border-gray-300 block">
            {user.first_name}
          </span>
        </div>
      
        <div className="grid w-full items-center mb-4">
          <Label className="text-sm font-medium text-gray-700 mb-1" htmlFor="last_name">Last Name</Label>
          <span className="bg-gray-50 p-2 rounded-md border border-gray-300 block">
            {user.last_name}
          </span>
        </div>
    
        <div className="grid w-auto items-center mb-4">
          <Label className="text-sm font-medium text-gray-700 mb-1" htmlFor="age">Age</Label>
          <div className="bg-gray-50 p-2 rounded-md border border-gray-300 pr-4">
            {user.age}
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-4">

        <div className="grid w-full items-center mb-4">
          <Label className="text-sm font-medium text-gray-700 mb-1" htmlFor="location">Location</Label>
          <span className="bg-gray-50 p-2 rounded-md border border-gray-300 block">
            {user.location}
          </span>
        </div>
        
        <div className="grid w-auto items-center mb-4">
          <Label className="text-sm font-medium text-gray-700 mb-1" htmlFor="created_at">Created At</Label>
          <span className="bg-gray-50 p-2 rounded-md border border-gray-300 whitespace-nowrap">
            {new Date(user.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            })}   
          </span>
        </div>

      </div>
    
      {/* Document 1 Section */}
      <div className="grid w-full items-center mb-4">
        <Label className="text-sm font-medium text-gray-700 mb-1" htmlFor="document_1">Document 1</Label>
        <img
          src={user.document_1}
          alt="Document 1"
          className="w-full max-w-md rounded-md border border-gray-300"
        />
      </div>
    
      {/* Document 2 Section */}
      <div className="grid w-full items-center mb-4">
        <Label className="text-sm font-medium text-gray-700 mb-1" htmlFor="document_2">Document 2</Label>
        <img
          src={user.document_2}
          alt="Document 2"
          className="w-full max-w-md rounded-md border border-gray-300"
        />
      </div>
    
      {/* Created At Section */}
 
    </div>
  );
}