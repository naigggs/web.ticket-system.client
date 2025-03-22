import {
  GalleryVerticalEnd,
  SquareTerminal,
  TicketPlus,
  RadioTower,
  NotebookPen,
  UserRoundCog,
  Ticket,
  TicketXIcon,
  ClipboardType,
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
      url: "/staff/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Taskboard",
      url: "/staff/taskboard",
      icon: ClipboardType,
      isActive: true,
    },
    {
      title: "Closed Tickets",
      url: "/staff/closed",
      icon: TicketXIcon,
      isActive: true,
    },
    {
      title: "Announcements",
      url: "/staff/announcements",
      icon: RadioTower,
      isActive: true,
    },
    // {
    //   title: "Surveys",
    //   url: "/staff/surveys",
    //   icon: NotebookPen,
    //   isActive: true,
    // },
  ],
};
