"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bell,
  Check,
  CheckCheck,
  MessageSquare,
  Heart,
  UserPlus,
  Settings,
  X,
} from "lucide-react";

let Notification = {
  id: "",
  type: "message" | "like" | "follow" | "system",
  title: "",
  description: "",
  timestamp: "",
  read: false,
  avatar: undefined,
};

const mockNotifications = [
  {
    id: "1",
    type: "message",
    title: "New message from Sarah",
    description: "Hey! Are we still on for lunch tomorrow?",
    timestamp: "2 min ago",
    read: false,
  },
  {
    id: "2",
    type: "like",
    title: "John liked your post",
    description: "Your photo from the weekend trip",
    timestamp: "15 min ago",
    read: false,
  },
  {
    id: "3",
    type: "follow",
    title: "Emma started following you",
    description: "Check out their profile",
    timestamp: "1 hour ago",
    read: true,
  },
  {
    id: "4",
    type: "system",
    title: "Security alert",
    description: "New login from Chrome on Windows",
    timestamp: "2 hours ago",
    read: true,
  },
  {
    id: "5",
    type: "message",
    title: "Team meeting reminder",
    description: "Daily standup starts in 30 minutes",
    timestamp: "3 hours ago",
    read: false,
  },
  {
    id: "6",
    type: "like",
    title: "Alex and 3 others liked your comment",
    description: "On the project discussion thread",
    timestamp: "5 hours ago",
    read: true,
  },
];

const getNotificationIcon = () => {
  switch (Notification.type) {
    case "message":
      return <MessageSquare className="h-4 w-4 text-blue-500" />;
    case "like":
      return <Heart className="h-4 w-4 text-red-500" />;
    case "follow":
      return <UserPlus className="h-4 w-4 text-green-500" />;
    case "system":
      return <Settings className="h-4 w-4 text-orange-500" />;
    default:
      return <Bell className="h-4 w-4 text-gray-500" />;
  }
};

export default function NotificationsComponent() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllAsRead}
            className="text-xs"
          >
            <CheckCheck className="h-3 w-3 mr-1" />
            Mark all read
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-96">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                No notifications yet
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors border-l-2 ${
                    notification.read
                      ? "border-l-transparent"
                      : "border-l-blue-500 bg-blue-50/50"
                  }`}
                >
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={`text-sm font-medium leading-tight ${
                          notification.read
                            ? "text-muted-foreground"
                            : "text-foreground"
                        }`}
                      >
                        {notification.title}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => removeNotification(notification.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {notification.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {notification.timestamp}
                      </span>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs px-2"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Mark read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
