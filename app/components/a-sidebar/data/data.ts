import {
  GalleryVerticalEnd,
  SquareTerminal,
  TicketPlus,
  RadioTower,
  NotebookPen,
  UserRoundCog
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
      title: "Manage Accounts",
      url: "/a-accounts",
      icon: UserRoundCog,
      isActive: true,
    },
    {
      title: "Announcements",
      url: "/a-announcements",
      icon: RadioTower,
      isActive: true,
    },
    {
      title: "Surveys",
      url: "/a-surveys",
      icon: NotebookPen,
      isActive: true,
    },
  ],
};
