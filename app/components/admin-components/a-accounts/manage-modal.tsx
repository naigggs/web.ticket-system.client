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
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface UserDetailViewProps {
  user: {
    user_id: string;
    full_name: string;
    age: number;
    location: string;
    document_1: string;
    document_2: string;
    created_at: string;
  };
  onUpdate: (updatedUser: any) => void;
}

export function ManageModal({ user, onUpdate }: UserDetailViewProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleUpdate = (updatedUser: any) => {
    onUpdate(updatedUser);
    setOpen(false);
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent
          className="max-w-2xl w-[90vw] sm:w-full max-h-[90vh] overflow-y-auto rounded-lg"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Created at: {new Date(user.created_at).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          <UserDetailForm user={user} onUpdate={handleUpdate} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full px-2 h-[90%]">
        <DrawerHeader className="text-center">
          <DrawerTitle>User Details</DrawerTitle>
          <DrawerDescription>
            Created at: {new Date(user.created_at).toLocaleDateString()}
          </DrawerDescription>
        </DrawerHeader>
        <UserDetailForm user={user} onUpdate={onUpdate} />
        <DrawerFooter className="pt-2 w-full">
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function UserDetailForm({
  user,
  className,
  onUpdate,
}: UserDetailViewProps & React.ComponentProps<"div">) {
  const [formData, setFormData] = React.useState(user);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user-info/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: formData.user_id, ...formData }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      toast({
        title: "User updated successfully!",
        variant: "default",
      });

      onUpdate(formData); // Notify parent component of the update
    } catch (err) {
      toast({
        title: "Error updating user",
        description: err instanceof Error ? err.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("h-auto overflow-y-auto", className)}>
      <div className="flex flex-row gap-4">
        <div className="grid w-full items-center mb-4">
          <Label
            className="text-sm font-medium text-gray-700 mb-1"
            htmlFor="full_name"
          >
            Full Name
          </Label>
          <Input
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="bg-gray-50 p-2 rounded-md border border-gray-300 block"
          />
        </div>
      </div>

      <div className="flex flex-row gap-4">
        <div className="grid w-full items-center mb-4">
          <Label
            className="text-sm font-medium text-gray-700 mb-1"
            htmlFor="location"
          >
            Address
          </Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="bg-gray-50 p-2 rounded-md border border-gray-300 block"
          />
        </div>
      </div>

      {/* Document 1 Section */}
      <div className="grid w-full items-center mb-4">
        <Label
          className="text-sm font-medium text-gray-700 mb-1"
          htmlFor="document_1"
        >
          Front ID
        </Label>
        <img
          src={formData.document_1}
          alt="Document 1"
          className="w-full max-w-md rounded-md border border-gray-300"
        />
      </div>

      {/* Document 2 Section */}
      <div className="grid w-full items-center mb-4">
        <Label
          className="text-sm font-medium text-gray-700 mb-1"
          htmlFor="document_2"
        >
          Back ID
        </Label>
        <img
          src={formData.document_2}
          alt="Document 2"
          className="w-full max-w-md rounded-md border border-gray-300"
        />
      </div>

      <div className="w-full flex justify-between">
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>

        <Button type="submit">
          Save Changes
        </Button>
      </div>

    </form>
  );
}