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
  ChartArea,
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
      url: "/admin/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Taskboard",
      url: "/admin/taskboard",
      icon: ClipboardType,
      isActive: true,
    },
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: ChartArea,
      isActive: true,
    },
    {
      title: "Closed Tickets",
      url: "/admin/closed",
      icon: TicketXIcon,
      isActive: true,
    },

    {
      title: "Manage Accounts",
      url: "/admin/accounts",
      icon: UserRoundCog,
      isActive: true,
    },
    {
      title: "Announcements",
      url: "/admin/announcements",
      icon: RadioTower,
      isActive: true,
    },
    // {
    //   title: "Surveys",
    //   url: "/admin/surveys",
    //   icon: NotebookPen,
    //   isActive: true,
    // },
  ],
};
