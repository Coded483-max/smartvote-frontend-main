import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Vote,
  Bell,
  Search,
  Filter,
  MoreVertical,
  ArrowLeft,
  Settings,
  CheckCircle,
  Clock,
  Info,
  Users,
  Trophy,
  Trash2,
  Archive,
  Star,
  Eye,
  EyeOff,
  Download,
  RefreshCw,
} from "lucide-react";

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [notificationSettings, setNotificationSettings] = useState({
    elections: true,
    results: true,
    reminders: true,
    achievements: true,
    system: false,
  });

  const notifications = [
    {
      id: 1,
      type: "election",
      title: "New Election: Department Representative",
      message:
        "Voting is now open for Computer Science Department Representative. Cast your vote before December 25th.",
      timestamp: "2 hours ago",
      read: false,
      priority: "high",
      icon: Vote,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      actionUrl: "/vote/dept-rep-2024",
    },
    {
      id: 2,
      type: "reminder",
      title: "Voting Deadline Reminder",
      message:
        "Don't forget to vote in the President Student Council election. Only 2 days left!",
      timestamp: "5 hours ago",
      read: false,
      priority: "high",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      actionUrl: "/vote/president-2024",
    },
    {
      id: 3,
      type: "achievement",
      title: "Achievement Unlocked: Early Bird",
      message:
        "Congratulations! You've earned the 'Early Bird' achievement for voting within 24 hours of election opening.",
      timestamp: "1 day ago",
      read: true,
      priority: "medium",
      icon: Trophy,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      actionUrl: "/profile#achievements",
    },
    {
      id: 4,
      type: "result",
      title: "Election Results Published",
      message:
        "Results for the Sports Director election are now available. Check out who won!",
      timestamp: "2 days ago",
      read: true,
      priority: "medium",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      actionUrl: "/results/sports-director-2024",
    },
    {
      id: 5,
      type: "system",
      title: "Platform Maintenance Scheduled",
      message:
        "SmartVote will undergo maintenance on December 28th from 2:00 AM to 4:00 AM. Voting will be temporarily unavailable.",
      timestamp: "3 days ago",
      read: true,
      priority: "low",
      icon: Settings,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      actionUrl: null,
    },
    {
      id: 6,
      type: "election",
      title: "Candidate Registration Open",
      message:
        "Registration is now open for the upcoming Academic Affairs Director election. Interested students can apply until December 30th.",
      timestamp: "4 days ago",
      read: true,
      priority: "medium",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      actionUrl: "/elections/academic-affairs-2025",
    },
    {
      id: 7,
      type: "reminder",
      title: "Profile Update Reminder",
      message:
        "Please update your profile information to ensure you receive important election notifications.",
      timestamp: "1 week ago",
      read: true,
      priority: "low",
      icon: Info,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      actionUrl: "/profile",
    },
    {
      id: 8,
      type: "result",
      title: "Your Vote Confirmed",
      message:
        "Your vote in the Club President election has been successfully recorded on the blockchain. Transaction ID: 0x7f9a8b2c...",
      timestamp: "1 week ago",
      read: true,
      priority: "high",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      actionUrl: "/vote-receipt/club-president-2024",
    },
  ];

  const notificationTypes = [
    { id: "all", label: "All", count: notifications.length },
    {
      id: "unread",
      label: "Unread",
      count: notifications.filter((n) => !n.read).length,
    },
    {
      id: "election",
      label: "Elections",
      count: notifications.filter((n) => n.type === "election").length,
    },
    {
      id: "reminder",
      label: "Reminders",
      count: notifications.filter((n) => n.type === "reminder").length,
    },
    {
      id: "result",
      label: "Results",
      count: notifications.filter((n) => n.type === "result").length,
    },
    {
      id: "achievement",
      label: "Achievements",
      count: notifications.filter((n) => n.type === "achievement").length,
    },
    {
      id: "system",
      label: "System",
      count: notifications.filter((n) => n.type === "system").length,
    },
  ];

  const filteredNotifications = notifications.filter((notification) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "unread" && !notification.read) ||
      notification.type === activeTab;
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (notification) => {
    if (notification.actionUrl) {
      // Navigate to the action URL
      console.log(`Navigating to: ${notification.actionUrl}`);
    }
  };

  const handleMarkAsRead = (notificationId) => {
    // Mark notification as read
    console.log(`Marking notification ${notificationId} as read`);
  };

  const handleMarkAllAsRead = () => {
    // Mark all notifications as read
    console.log("Marking all notifications as read");
  };

  const handleDeleteNotification = (notificationId) => {
    // Delete notification
    console.log(`Deleting notification ${notificationId}`);
  };

  const handleToggleNotificationSetting = (setting, value) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-yellow-500";
      case "low":
        return "border-l-gray-300";
      default:
        return "border-l-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="border-b bg-white/80 backdrop-blur-sm  ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                <Bell className="w-3 h-3 mr-1" />
                Notifications
              </Badge>
              {unreadCount > 0 && (
                <Badge variant="destructive">{unreadCount} unread</Badge>
              )}
              <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
                Mark All Read
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Notifications
          </h1>
          <p className="text-gray-600">
            Stay updated with election announcements, reminders, and results.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Filter Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Separator />

                {/* Notification Types */}
                <div className="space-y-2">
                  {notificationTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setActiveTab(type.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === type.id
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : "hover:bg-gray-100 text-gray-600"
                      }`}
                    >
                      <span className="text-sm">{type.label}</span>
                      {type.count > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {type.count}
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>

                <Separator />

                {/* Quick Settings */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Quick Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bell className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">Elections</span>
                      </div>
                      <Switch
                        checked={notificationSettings.elections}
                        onCheckedChange={(value) =>
                          handleToggleNotificationSetting("elections", value)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">Reminders</span>
                      </div>
                      <Switch
                        checked={notificationSettings.reminders}
                        onCheckedChange={(value) =>
                          handleToggleNotificationSetting("reminders", value)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Trophy className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">Achievements</span>
                      </div>
                      <Switch
                        checked={notificationSettings.achievements}
                        onCheckedChange={(value) =>
                          handleToggleNotificationSetting("achievements", value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Notification Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {notifications.length}
                  </div>
                  <div className="text-sm text-gray-600">Total</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {unreadCount}
                  </div>
                  <div className="text-sm text-gray-600">Unread</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {notifications.filter((n) => n.type === "election").length}
                  </div>
                  <div className="text-sm text-gray-600">Elections</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {
                      notifications.filter((n) => n.type === "achievement")
                        .length
                    }
                  </div>
                  <div className="text-sm text-gray-600">Achievements</div>
                </CardContent>
              </Card>
            </div>

            {/* Notifications List */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>
                      {activeTab === "all"
                        ? "All Notifications"
                        : activeTab === "unread"
                        ? "Unread Notifications"
                        : notificationTypes.find((t) => t.id === activeTab)
                            ?.label + " Notifications"}
                    </CardTitle>
                    <CardDescription>
                      {filteredNotifications.length} notification
                      {filteredNotifications.length !== 1 ? "s" : ""}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Filter className="w-4 h-4 mr-2" />
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={handleMarkAllAsRead}>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark All as Read
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Archive className="w-4 h-4 mr-2" />
                          Archive All
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Export Notifications
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-12">
                    <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No notifications found
                    </h3>
                    <p className="text-gray-600">
                      {searchTerm
                        ? "Try adjusting your search terms."
                        : "You're all caught up!"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-l-4 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                          notification.read ? "bg-white" : notification.bgColor
                        } ${getPriorityColor(notification.priority)}`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <div
                              className={`p-2 rounded-full ${notification.bgColor}`}
                            >
                              <notification.icon
                                className={`w-5 h-5 ${notification.color}`}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4
                                  className={`font-semibold ${
                                    !notification.read
                                      ? "text-gray-900"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {notification.title}
                                </h4>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                )}
                                <Badge variant="outline" className="text-xs">
                                  {notification.type}
                                </Badge>
                              </div>
                              <p
                                className={`text-sm ${
                                  !notification.read
                                    ? "text-gray-700"
                                    : "text-gray-600"
                                } mb-2`}
                              >
                                {notification.message}
                              </p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <span>{notification.timestamp}</span>
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${
                                    notification.priority === "high"
                                      ? "border-red-200 text-red-600"
                                      : notification.priority === "medium"
                                      ? "border-yellow-200 text-yellow-600"
                                      : "border-gray-200 text-gray-600"
                                  }`}
                                >
                                  {notification.priority} priority
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMarkAsRead(notification.id);
                                }}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            )}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {!notification.read ? (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleMarkAsRead(notification.id)
                                    }
                                  >
                                    <Eye className="w-4 h-4 mr-2" />
                                    Mark as Read
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem>
                                    <EyeOff className="w-4 h-4 mr-2" />
                                    Mark as Unread
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem>
                                  <Star className="w-4 h-4 mr-2" />
                                  Star
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Archive className="w-4 h-4 mr-2" />
                                  Archive
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() =>
                                    handleDeleteNotification(notification.id)
                                  }
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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
      </div>
    </div>
  );
};

export default Notifications;
