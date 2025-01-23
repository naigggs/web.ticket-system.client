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
        <DialogContent className="sm:max-w-[425px]" onOpenAutoFocus={(e) => e.preventDefault()}>
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
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>User Details</DrawerTitle>
          <DrawerDescription>
            Detailed information about the user.
          </DrawerDescription>
        </DrawerHeader>
        <UserDetailForm user={user} className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
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
    <div className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="first_name">First Name</Label>
        <div id="first_name">{user.first_name}</div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="last_name">Last Name</Label>
        <div id="last_name">{user.last_name}</div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="age">Age</Label>
        <div id="age">{user.age}</div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="location">Location</Label>
        <div id="location">{user.location}</div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="document_1">Document 1</Label>
        <img
        src={user.document_1}
        alt="Document 1"
        className="w-full max-w-md rounded-md border border-gray-300"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="document_2">Document 2</Label>
        <img
        src={user.document_2}
        alt="Document 2"
        className="w-full max-w-md rounded-md border border-gray-300"
        />
        <div id="document_2">{user.document_2}</div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="created_at">Created At</Label>
        <div id="created_at">{user.created_at}</div>
      </div>
    </div>
  );
}