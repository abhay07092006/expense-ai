"use client";

import {
  createContext,
  ReactNode,
  useState,
} from "react";
import { Notification } from "@/types/notification";

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (
    notification: Omit<
      Notification,
      "id" | "createdAt" | "read"
    >
  ) => void;
  markAsRead: (id: string) => void;
  clearNotifications: () => void;
}

export const NotificationContext =
  createContext<NotificationContextType>({
    notifications: [],
    addNotification: () => {},
    markAsRead: () => {},
    clearNotifications: () => {},
  });

export default function NotificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  function addNotification(
    notification: Omit<
      Notification,
      "id" | "createdAt" | "read"
    >
  ) {
    setNotifications((prev) => [
      {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        read: false,
        ...notification,
      },
      ...prev,
    ]);
  }

  function markAsRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id
          ? { ...n, read: true }
          : n
      )
    );
  }

  function clearNotifications() {
    setNotifications([]);
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}