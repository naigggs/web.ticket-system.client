import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react"; // Import useState

export function AnnouncementForm({
  className,
  onSuccess,
}: React.ComponentProps<"form"> & { onSuccess?: () => void }) {
  const { toast } = useToast();
  const formClassName = `grid items-start gap-4 ${className || ""}`;

  // State to track form field values
  const [formValues, setFormValues] = useState({
    title: "",
    subtitle: "",
    description: "",
    body: "",
  });

  // Handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Check if all fields are filled
  const isFormValid = Object.values(formValues).every((value) => value.trim() !== "");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const announcement = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      subtitle: formData.get("subtitle") as string,
      body: formData.get("body") as string,
    };

    try {
      const response = await fetch("/api/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(announcement),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create announcement");
      }

      // Show success toast
      toast({
        title: "Success",
        description: "Announcement created successfully!",
        variant: "default",
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      // Show error toast
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create announcement",
        variant: "destructive",
      });
      console.error("Error creating announcement:", error);
    }
  };

  return (
    <form className={formClassName} onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter announcement title"
          value={formValues.title}
          onChange={handleInputChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="subtitle">Subtitle</Label>
        <Input
          id="subtitle"
          name="subtitle"
          placeholder="Enter announcement subtitle"
          value={formValues.subtitle}
          onChange={handleInputChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          className="w-full p-2 border rounded mt-1"
          name="description"
          placeholder="Description..."
          rows={2}
          value={formValues.description}
          onChange={handleInputChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="body">Body</Label>
        <textarea
          className="w-full p-2 border rounded mt-1"
          name="body"
          placeholder="Body..."
          rows={5}
          value={formValues.body}
          onChange={handleInputChange}
        />
      </div>
      <Button type="submit" disabled={!isFormValid}>
        Create Announcement
      </Button>
    </form>
  );
}