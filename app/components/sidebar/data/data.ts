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
      title: "Dashboard",
      url: "/u-dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Submit Ticket",
      url: "/u-tickets",
      icon: TicketPlus,
      isActive: true,
    },
    {
      title: "Announcements",
      url: "/u-announcements",
      icon: RadioTower,
      isActive: true,
    },
    {
      title: "Surveys",
      url: "/u-surveys",
      icon: NotebookPen,
      isActive: true,
    },
  ],
};
