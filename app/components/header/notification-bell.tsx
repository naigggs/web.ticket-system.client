"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";

type Notification = {
  id: any;
  message: string;
  read: boolean;
};

const NotificationBell = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const supabase = createClient();

  useEffect(() => {
    const savedNotifications = JSON.parse(
      localStorage.getItem("notifications") || "[]"
    );
    setNotifications(savedNotifications);

    const unread = savedNotifications.filter(
      (n: Notification) => !n.read
    ).length;
    setUnreadCount(unread);
  }, []);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Function to fetch user info
  const fetchUserInfo = async (userId: string) => {
    const { data, error } = await supabase
      .from("user-info")
      .select("full_name")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching user info:", error);
      return null;
    }

    console.log("User Info:", data);

    return data?.full_name || "Unknown User";
  };

  // Subscribe to ticket updates
  useEffect(() => {
    const subscriptionTickets = supabase
      .channel("public:tickets")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "tickets" },
        async (payload) => {
          const updatedTicket = payload.new;
          const oldTicket = payload.old;

          let newNotification = null;
          console.log("Payload:", payload);
          console.log("Updated Ticket:", updatedTicket);
          console.log("Old Ticket:", oldTicket);

          if (updatedTicket.ticket_status !== oldTicket.ticket_status) {
            newNotification = {
              id: `${updatedTicket.id}-${Date.now()}`,
              message: `Ticket - ${updatedTicket.id} status changed from ${oldTicket.ticket_status} to ${updatedTicket.ticket_status}`,
              read: false,
            };
          } else if (updatedTicket.assignee_id !== oldTicket.assignee_id) {
            const oldAssigneeName = await fetchUserInfo(oldTicket.assignee_id);
            const newAssigneeName = await fetchUserInfo(updatedTicket.assignee_id);

            newNotification = {
              id: `${updatedTicket.id}-${Date.now()}`,
              message: `Ticket - ${updatedTicket.id} has been assigned to ${newAssigneeName}`,
              read: false,
            };
          }

          if (newNotification) {
            // Add new notification and keep only the latest 5
            setNotifications((prev) => {
              const updatedNotifications = [newNotification, ...prev].slice(
                0,
                5
              );
              return updatedNotifications;
            });

            // Update unread count
            setUnreadCount((prev) => prev + 1);
          }
        }
      )
      .subscribe();

    const subscriptionAnnouncements = supabase
      .channel("public:announcements")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "announcements" },
        (payload) => {
          const newAnnouncement = payload.new;

          const newNotification = {
            id: `${newAnnouncement.id}-${Date.now()}`,
            message: `New announcement: ${newAnnouncement.title}`,
            read: false,
          };

          // Add new notification and keep only the latest 5
          setNotifications((prev) => {
            const updatedNotifications = [newNotification, ...prev].slice(0, 5);
            return updatedNotifications;
          });

          // Update unread count
          setUnreadCount((prev) => prev + 1);
        }
      )
      .subscribe();

    const subscriptionSurveys = supabase
      .channel("public:surveys")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "surveys" },
        (payload) => {
          const newSurvey = payload.new;

          const newNotification = {
            id: `${newSurvey.id}-${Date.now()}`,
            message: `New survey available: ${newSurvey.title}`,
            read: false,
          };

          // Add new notification and keep only the latest 5
          setNotifications((prev) => {
            const updatedNotifications = [newNotification, ...prev].slice(0, 5);
            return updatedNotifications;
          });

          // Update unread count
          setUnreadCount((prev) => prev + 1);
        }
      )
      .subscribe();

    // Cleanup subscriptions on unmount
    return () => {
      supabase.removeChannel(subscriptionTickets);
      supabase.removeChannel(subscriptionAnnouncements);
      supabase.removeChannel(subscriptionSurveys);
    };
  }, []);

  // Mark notification as read on hover
  const handleNotificationHover = (id: any) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4">
          <h4 className="font-semibold mb-4">Notifications</h4>
          {notifications.length > 0 ? (
            <ul className="space-y-2">
              {notifications.map((notif) => (
                <li
                  key={notif.id}
                  onMouseEnter={() => handleNotificationHover(notif.id)}
                  className={`p-2 rounded-md hover:bg-gray-100 transition-colors ${
                    notif.read ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  {notif.message}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No new notifications.</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationBell;