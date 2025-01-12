import {
  GalleryVerticalEnd,
  SquareTerminal,
  TicketPlus,
  RadioTower,
  NotebookPen
} from "lucide-react";

export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Manibaug Porac",
      logo: GalleryVerticalEnd,
      plan: "Ticket System",
    },
  ],
  navMain: [
    {
      title: "Task Board",
      url: "/a-dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Submit Ticket",
      url: "#",
      icon: TicketPlus,
      isActive: true,
    },
    {
      title: "Announcements",
      url: "#",
      icon: RadioTower,
      isActive: true,
    },
    {
      title: "Surveys",
      url: "#",
      icon: NotebookPen,
      isActive: true,
    },
  ],
};
