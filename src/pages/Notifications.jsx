
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Notification } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  Trash2
} from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import SimpleBackground from "../components/background/SimpleBackground";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const allNotifications = await Notification.list('-created_date');
      setNotifications(allNotifications);
    } catch (error) {
      console.error("Error loading notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await Notification.update(notificationId, { read: true });
      setNotifications(prev =>
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      await Notification.delete(notificationId);
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(n => !n.read);
      await Promise.all(
        unreadNotifications.map(n => Notification.update(n.id, { read: true }))
      );
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'border-l-green-400 bg-green-500/10';
      case 'warning':
        return 'border-l-yellow-400 bg-yellow-500/10';
      case 'error':
        return 'border-l-red-400 bg-red-500/10';
      default:
        return 'border-l-blue-400 bg-blue-500/10';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <SimpleBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#13E8E9]"></div>
        </div>
      </SimpleBackground>
    );
  }

  return (
    <SimpleBackground>
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <Link to={createPageUrl("Dashboard")}>
                <Button variant="outline" size="icon" className="rounded-xl border-white/30 hover:bg-white/20 text-white backdrop-blur-sm bg-[#1a1d2e]/80 hover:border-white/40 transition-all duration-300">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <Bell className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    Notifiche
                  </h1>
                  <p className="text-white/80 mt-1">
                    Resta aggiornato su tutte le novità
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {unreadCount > 0 && (
                  <Badge className="bg-red-500/20 text-red-400 border-0 px-4 py-2">
                    {unreadCount} Non lette
                  </Badge>
                )}
                <Badge className="bg-blue-500/20 text-blue-400 border-0 px-4 py-2">
                  {notifications.length} Totali
                </Badge>
              </div>
            </div>

            {/* Actions */}
            {unreadCount > 0 && (
              <div className="flex justify-end">
                <Button
                  onClick={markAllAsRead}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Segna tutte come lette
                </Button>
              </div>
            )}
          </div>

          {/* Notifications List */}
          <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
            <CardContent className="p-0">
              {notifications.length === 0 ? (
                <div className="text-center p-12">
                  <Bell className="w-16 h-16 text-white/50 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Nessuna notifica
                  </h3>
                  <p className="text-white/80">
                    Le tue notifiche appariranno qui quando disponibili
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-white/20">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-6 border-l-4 transition-all duration-200 hover:bg-white/5 ${
                        getNotificationColor(notification.type)
                      } ${!notification.read ? 'bg-white/5' : ''}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="flex-shrink-0 mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className={`font-semibold ${!notification.read ? 'text-white' : 'text-white/80'}`}>
                                {notification.title}
                              </h3>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-[#13E8E9] rounded-full"></div>
                              )}
                            </div>

                            <p className={`mb-3 ${!notification.read ? 'text-white/90' : 'text-white/70'}`}>
                              {notification.message}
                            </p>

                            <div className="flex items-center justify-between">
                              <span className="text-xs text-white/60">
                                {format(new Date(notification.created_date), 'dd MMM yyyy, HH:mm', { locale: it })}
                              </span>

                              {notification.action_url && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm text-xs"
                                >
                                  Visualizza
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.read && (
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => markAsRead(notification.id)}
                              className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          )}

                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => deleteNotification(notification.id)}
                            className="h-8 w-8 text-white/70 hover:text-red-400 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </SimpleBackground>
  );
}
