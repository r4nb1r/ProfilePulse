import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle, AlertCircle, InfoIcon } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'review' | 'performance' | 'system';
}

interface NotificationsProps {
  isAuthenticated: boolean;
}

const Notifications = ({ isAuthenticated }: NotificationsProps) => {

  // Using simulated notifications data for now - would be replaced with API call
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'New Review',
      message: 'Your business "Sunset Cafe" received a new 5-star review.',
      time: '2 hours ago',
      read: false,
      type: 'review'
    },
    {
      id: '2',
      title: 'Profile Optimization Complete',
      message: 'We\'ve successfully optimized "Urban Fitness" profile with your requested changes.',
      time: '1 day ago',
      read: true,
      type: 'system'
    },
    {
      id: '3',
      title: 'Performance Alert',
      message: 'Your "Downtown Books" profile views decreased by 15% this week.',
      time: '2 days ago',
      read: false,
      type: 'performance'
    },
    {
      id: '4',
      title: 'New Message',
      message: 'A customer asked about your business hours for "Green Grocers".',
      time: '3 days ago',
      read: true,
      type: 'review'
    },
    {
      id: '5',
      title: 'Scheduled Maintenance',
      message: 'Google My Business API will be undergoing maintenance this weekend.',
      time: '4 days ago',
      read: true,
      type: 'system'
    },
    {
      id: '6',
      title: 'Performance Improvement',
      message: 'Your "City Dental" profile has seen a 23% increase in direction requests.',
      time: '5 days ago',
      read: true,
      type: 'performance'
    },
  ]);

  // Function to mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  // Function to mark a single notification as read
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  // Function to get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'review':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'performance':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'system':
        return <InfoIcon className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-slate-500" />;
    }
  };

  // Function to get notification badge based on type
  const getNotificationBadge = (type: string) => {
    switch (type) {
      case 'review':
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Review</Badge>;
      case 'performance':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200">Performance</Badge>;
      case 'system':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">System</Badge>;
      default:
        return <Badge variant="outline">Notification</Badge>;
    }
  };

  return (
    <div className="bg-slate-50 font-sans min-h-screen">
      <AppHeader isAuthenticated={isAuthenticated} />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <PageHeader 
            title="Notifications" 
            description="Stay updated with your business profile activities" 
          />
          {notifications.some(n => !n.read) && (
            <Button variant="outline" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        
        {isAuthenticated ? (
          <Card>
            <CardHeader>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full md:w-auto grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="system">System</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <TabsContent value="all" className="mt-0">
                {notifications.length > 0 ? (
                  <div className="divide-y">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`py-4 transition ${!notification.read ? 'bg-blue-50' : ''}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 pt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className={`text-sm font-medium ${!notification.read ? 'text-blue-900' : 'text-gray-900'}`}>
                                {notification.title}
                              </p>
                              <div className="flex items-center gap-2">
                                {getNotificationBadge(notification.type)}
                                <span className="text-xs text-gray-500">{notification.time}</span>
                              </div>
                            </div>
                            <p className={`text-sm ${!notification.read ? 'text-blue-800' : 'text-gray-600'}`}>
                              {notification.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Bell className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      You don't have any notifications at the moment.
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-0">
                {notifications.filter(n => n.type === 'review').length > 0 ? (
                  <div className="divide-y">
                    {notifications
                      .filter(n => n.type === 'review')
                      .map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`py-4 transition ${!notification.read ? 'bg-blue-50' : ''}`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 pt-1">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <p className={`text-sm font-medium ${!notification.read ? 'text-blue-900' : 'text-gray-900'}`}>
                                  {notification.title}
                                </p>
                                <div className="flex items-center gap-2">
                                  {getNotificationBadge(notification.type)}
                                  <span className="text-xs text-gray-500">{notification.time}</span>
                                </div>
                              </div>
                              <p className={`text-sm ${!notification.read ? 'text-blue-800' : 'text-gray-600'}`}>
                                {notification.message}
                              </p>
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No review notifications</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      You don't have any review notifications at the moment.
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="performance" className="mt-0">
                {notifications.filter(n => n.type === 'performance').length > 0 ? (
                  <div className="divide-y">
                    {notifications
                      .filter(n => n.type === 'performance')
                      .map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`py-4 transition ${!notification.read ? 'bg-blue-50' : ''}`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 pt-1">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <p className={`text-sm font-medium ${!notification.read ? 'text-blue-900' : 'text-gray-900'}`}>
                                  {notification.title}
                                </p>
                                <div className="flex items-center gap-2">
                                  {getNotificationBadge(notification.type)}
                                  <span className="text-xs text-gray-500">{notification.time}</span>
                                </div>
                              </div>
                              <p className={`text-sm ${!notification.read ? 'text-blue-800' : 'text-gray-600'}`}>
                                {notification.message}
                              </p>
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No performance notifications</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      You don't have any performance notifications at the moment.
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="system" className="mt-0">
                {notifications.filter(n => n.type === 'system').length > 0 ? (
                  <div className="divide-y">
                    {notifications
                      .filter(n => n.type === 'system')
                      .map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`py-4 transition ${!notification.read ? 'bg-blue-50' : ''}`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 pt-1">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <p className={`text-sm font-medium ${!notification.read ? 'text-blue-900' : 'text-gray-900'}`}>
                                  {notification.title}
                                </p>
                                <div className="flex items-center gap-2">
                                  {getNotificationBadge(notification.type)}
                                  <span className="text-xs text-gray-500">{notification.time}</span>
                                </div>
                              </div>
                              <p className={`text-sm ${!notification.read ? 'text-blue-800' : 'text-gray-600'}`}>
                                {notification.message}
                              </p>
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <InfoIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No system notifications</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      You don't have any system notifications at the moment.
                    </p>
                  </div>
                )}
              </TabsContent>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-slate-600">Please sign in to view notifications</p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Notifications;