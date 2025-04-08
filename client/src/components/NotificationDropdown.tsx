import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'review' | 'performance' | 'system';
}

const NotificationDropdown = () => {
  // Simulated notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Review',
      message: 'You received a 5-star review from John D.',
      time: '5 minutes ago',
      read: false,
      type: 'review'
    },
    {
      id: '2',
      title: 'Profile Optimized',
      message: 'Acme Inc. profile has been successfully optimized.',
      time: '2 hours ago',
      read: false,
      type: 'system'
    },
    {
      id: '3',
      title: 'Performance Alert',
      message: 'Your profile views increased by 27% this week!',
      time: '1 day ago',
      read: false,
      type: 'performance'
    },
    {
      id: '4',
      title: 'System Update',
      message: 'New features added to your dashboard.',
      time: '3 days ago',
      read: true,
      type: 'system'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'review':
        return (
          <div className="flex-shrink-0 rounded-full bg-yellow-100 p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        );
      case 'performance':
        return (
          <div className="flex-shrink-0 rounded-full bg-green-100 p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="flex-shrink-0 rounded-full bg-blue-100 p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
        );
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative p-1 rounded-full text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
          <span className="sr-only">View notifications</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-1">
        <div className="flex items-center justify-between px-4 py-2">
          <DropdownMenuLabel className="text-lg font-bold">Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {unreadCount} new
            </Badge>
          )}
        </div>
        <DropdownMenuSeparator />
        
        <div className="max-h-[calc(80vh-10rem)] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-4 px-2 text-center text-slate-500">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="px-4 py-3 focus:bg-slate-50 cursor-default">
                <div 
                  className={`flex items-start space-x-3 ${notification.read ? 'opacity-75' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  {getTypeIcon(notification.type)}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium ${notification.read ? 'text-slate-600' : 'text-slate-900'}`}>
                        {notification.title}
                      </p>
                      <p className="text-xs text-slate-500">{notification.time}</p>
                    </div>
                    <p className="text-sm text-slate-500 leading-tight">{notification.message}</p>
                  </div>
                  {!notification.read && (
                    <div className="flex-shrink-0 h-2 w-2 rounded-full bg-primary"></div>
                  )}
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>
        
        <DropdownMenuSeparator />
        <div className="p-2 flex justify-between">
          <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
            Mark all as read
          </Button>
          <Button variant="link" size="sm" className="text-xs">
            View all
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;