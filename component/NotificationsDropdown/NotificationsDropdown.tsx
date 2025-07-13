"use client";

import React, {useEffect, useState} from "react";
import {Bell} from "lucide-react";
import {connectToNotifications, markAllAsRead} from "@/utils/RSocketClient";
import {Message} from "@/type";

export const NotificationsDropdown: React.FC<{
  userId?: string
}> = ({userId}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!userId) return
    void connectToNotifications(userId, (msg) => {
      setMessages((prev) => [msg, ...prev]);
    });
  }, [userId]);

  const handleMarkAllRead = () => {
    void markAllAsRead(userId);
    setMessages([]);
  };

  return (
    <div className="relative dropdown-end">
      <button className="btn btn-ghost btn-circle" onClick={() => setOpen(!open)}>
        <div className="indicator">
          <Bell size={24} />
          {messages.length > 0 && (
            <span className="badge badge-sm indicator-item">{messages.length}</span>
          )}
        </div>
      </button>
      {open && (
        <ul className="absolute right-0 mt-2 w-80 bg-base-100 shadow rounded-box menu p-2 z-50">
          <li className="font-bold mb-2">Notifications</li>
          {messages.length === 0 ? (
            <li className="text-sm italic text-gray-500">No new notifications</li>
          ) : (
            messages.map((msg, idx) => (
              <li key={idx} className="truncate max-w-full" title={msg.text}>
                {msg.text}--{msg.status}
              </li>
            ))
          )}
          {messages.length > 0 && (
            <li className="mt-2">
              <button className="btn btn-primary btn-sm w-full" onClick={handleMarkAllRead}>
                Mark all as read
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
