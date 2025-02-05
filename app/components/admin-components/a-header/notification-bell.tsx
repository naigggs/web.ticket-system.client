'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Bell } from 'lucide-react';

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
      localStorage.getItem('notifications') || '[]'
    );
    setNotifications(savedNotifications);

    const unread = savedNotifications.filter((n: Notification) => !n.read).length;
    setUnreadCount(unread);
  }, []);

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Subscribe to ticket updates
  useEffect(() => {
    const subscription = supabase
      .channel('public:tickets')
      .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'tickets' },
      (payload) => {
        const newTicket = payload.new;

        const newNotification = {
        id: `${newTicket.id}-${Date.now()}`,
        message: `New ticket created: Ticket - ${newTicket.id}`,
        read: false,
        };

        // Add new notification and keep only the latest 5
        setNotifications((prev) => {
        const updatedNotifications = [newNotification, ...prev].slice(0, 5);
        localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
        return updatedNotifications;
        });

        // Update unread count
        setUnreadCount((prev) => prev + 1);
      }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(subscription);
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
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full"
        >
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
                    notif.read ? 'bg-gray-50' : 'bg-white'
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