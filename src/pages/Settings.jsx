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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Vote,
  User,
  Shield,
  Bell,
  Eye,
  Smartphone,
  Download,
  Trash2,
  Key,
  Mail,
  Phone,
  Accessibility,
  HelpCircle,
  SettingsIcon,
  CheckCircle,
  AlertTriangle,
  Camera,
  Edit,
  Save,
  ArrowLeft,
} from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    elections: true,
    results: true,
    reminders: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: false,
    voteHistory: false,
    dataSharing: false,
  });

  const [preferences, setPreferences] = useState({
    language: "english",
    theme: "light",
    accessibility: false,
    fontSize: "medium",
  });

  const tabs = [
    { id: "profile", title: "Profile", icon: User },
    { id: "security", title: "Security", icon: Shield },
    { id: "notifications", title: "Notifications", icon: Bell },
    { id: "privacy", title: "Privacy", icon: Eye },
    { id: "preferences", title: "Preferences", icon: SettingsIcon },
    { id: "account", title: "Account", icon: Smartphone },
  ];

  const handleNotificationChange = (key, value) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key, value) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }));
  };

  const handlePreferenceChange = (key, value) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen">
      <div className="flex items-center space-x-4">
        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
          <SettingsIcon className="w-3 h-3 mr-1" />
          Settings
        </Badge>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Account Settings
          </h1>
          <p className="text-gray-600">
            Manage your SmartVote account preferences and security settings.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-100 text-blue-700 font-medium"
                        : "hover:bg-gray-100 text-gray-600"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="text-sm">{tab.title}</span>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Settings */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>
                          Update your personal information and profile details
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex items-center"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        {isEditing ? "Cancel" : "Edit"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Profile Picture */}
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <Avatar className="w-24 h-24">
                          <AvatarImage src="/placeholder.svg?height=96&width=96" />
                          <AvatarFallback className="text-2xl">
                            SC
                          </AvatarFallback>
                        </Avatar>
                        {isEditing && (
                          <Button
                            size="sm"
                            className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                            variant="secondary"
                          >
                            <Camera className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          Solomon Cudjoe
                        </h3>
                        <p className="text-gray-600">
                          Computer Science Student
                        </p>
                        <Badge variant="secondary" className="mt-1">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified Student
                        </Badge>
                      </div>
                    </div>

                    <Separator />

                    {/* Personal Information */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          defaultValue="Solomon"
                          disabled={!isEditing}
                          className={!isEditing ? "bg-gray-50" : ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          defaultValue="Cudjoe"
                          disabled={!isEditing}
                          className={!isEditing ? "bg-gray-50" : ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="studentId">Student ID</Label>
                        <Input
                          id="studentId"
                          defaultValue="CS2024001"
                          disabled
                          className="bg-gray-50"
                        />
                        <p className="text-xs text-gray-500">
                          Student ID cannot be changed
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue="solomon.gabriel@university.edu"
                          disabled={!isEditing}
                          className={!isEditing ? "bg-gray-50" : ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          defaultValue="+1 (555) 123-4567"
                          disabled={!isEditing}
                          className={!isEditing ? "bg-gray-50" : ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select disabled={!isEditing}>
                          <SelectTrigger
                            className={!isEditing ? "bg-gray-50" : ""}
                          >
                            <SelectValue placeholder="Computer Science" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cs">Computer Science</SelectItem>
                            <SelectItem value="eng">Engineering</SelectItem>
                            <SelectItem value="bus">
                              Business Administration
                            </SelectItem>
                            <SelectItem value="med">Medicine</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio (Optional)</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself..."
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                        rows={3}
                      />
                    </div>

                    {isEditing && (
                      <div className="flex justify-end space-x-3">
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={() => setIsEditing(false)}>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Password & Authentication</CardTitle>
                    <CardDescription>
                      Manage your account security and authentication methods
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Key className="w-5 h-5 text-blue-600" />
                          <div>
                            <h4 className="font-medium">Password</h4>
                            <p className="text-sm text-gray-600">
                              Last changed 30 days ago
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Change Password
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="w-5 h-5 text-green-600" />
                          <div>
                            <h4 className="font-medium">
                              Two-Factor Authentication
                            </h4>
                            <p className="text-sm text-gray-600">
                              Add an extra layer of security
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="outline"
                            className="text-red-600 border-red-200"
                          >
                            Disabled
                          </Badge>
                          <Button variant="outline" size="sm">
                            Enable
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium mb-4">Login Activity</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">
                              Current Session
                            </p>
                            <p className="text-xs text-gray-600">
                              Chrome on Windows • 192.168.1.100
                            </p>
                          </div>
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-700"
                          >
                            Active
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">Mobile App</p>
                            <p className="text-xs text-gray-600">
                              iPhone • 2 hours ago
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                          >
                            Revoke
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Security Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Login Notifications</h4>
                        <p className="text-sm text-gray-600">
                          Get notified of new login attempts
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">
                          Suspicious Activity Alerts
                        </h4>
                        <p className="text-sm text-gray-600">
                          Alert me of unusual account activity
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Choose how you want to receive updates about elections and
                      activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-4">Delivery Methods</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-blue-600" />
                            <div>
                              <h5 className="font-medium">
                                Email Notifications
                              </h5>
                              <p className="text-sm text-gray-600">
                                solomon.gabriel@university.edu
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={notifications.email}
                            onCheckedChange={(value) =>
                              handleNotificationChange("email", value)
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Phone className="w-5 h-5 text-green-600" />
                            <div>
                              <h5 className="font-medium">SMS Notifications</h5>
                              <p className="text-sm text-gray-600">
                                +1 (555) 123-4567
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={notifications.sms}
                            onCheckedChange={(value) =>
                              handleNotificationChange("sms", value)
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Bell className="w-5 h-5 text-purple-600" />
                            <div>
                              <h5 className="font-medium">
                                Push Notifications
                              </h5>
                              <p className="text-sm text-gray-600">
                                Browser and mobile app notifications
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={notifications.push}
                            onCheckedChange={(value) =>
                              handleNotificationChange("push", value)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium mb-4">Notification Types</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium">
                              Election Announcements
                            </h5>
                            <p className="text-sm text-gray-600">
                              New elections and candidate information
                            </p>
                          </div>
                          <Switch
                            checked={notifications.elections}
                            onCheckedChange={(value) =>
                              handleNotificationChange("elections", value)
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium">Election Results</h5>
                            <p className="text-sm text-gray-600">
                              Results and outcome notifications
                            </p>
                          </div>
                          <Switch
                            checked={notifications.results}
                            onCheckedChange={(value) =>
                              handleNotificationChange("results", value)
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium">Voting Reminders</h5>
                            <p className="text-sm text-gray-600">
                              Reminders about upcoming voting deadlines
                            </p>
                          </div>
                          <Switch
                            checked={notifications.reminders}
                            onCheckedChange={(value) =>
                              handleNotificationChange("reminders", value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === "privacy" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Controls</CardTitle>
                    <CardDescription>
                      Manage your privacy settings and data sharing preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Profile Visibility</h4>
                          <p className="text-sm text-gray-600">
                            Allow other students to see your profile information
                          </p>
                        </div>
                        <Switch
                          checked={privacy.profileVisible}
                          onCheckedChange={(value) =>
                            handlePrivacyChange("profileVisible", value)
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Voting History</h4>
                          <p className="text-sm text-gray-600">
                            Show which elections you participated in (not your
                            votes)
                          </p>
                        </div>
                        <Switch
                          checked={privacy.voteHistory}
                          onCheckedChange={(value) =>
                            handlePrivacyChange("voteHistory", value)
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">
                            Analytics Data Sharing
                          </h4>
                          <p className="text-sm text-gray-600">
                            Help improve SmartVote by sharing anonymous usage
                            data
                          </p>
                        </div>
                        <Switch
                          checked={privacy.dataSharing}
                          onCheckedChange={(value) =>
                            handlePrivacyChange("dataSharing", value)
                          }
                        />
                      </div>
                    </div>

                    <Separator />

                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Your vote is always private:</strong> Regardless
                        of these settings, your actual votes are always
                        encrypted and anonymous. No one can see how you voted.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Data Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Download Your Data</h4>
                        <p className="text-sm text-gray-600">
                          Get a copy of your account data and voting history
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Preferences Settings */}
            {activeTab === "preferences" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Display Preferences</CardTitle>
                    <CardDescription>
                      Customize how SmartVote looks and feels
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Language</Label>
                        <Select
                          value={preferences.language}
                          onValueChange={(value) =>
                            handlePreferenceChange("language", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="spanish">Español</SelectItem>
                            <SelectItem value="french">Français</SelectItem>
                            <SelectItem value="german">Deutsch</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Theme</Label>
                        <Select
                          value={preferences.theme}
                          onValueChange={(value) =>
                            handlePreferenceChange("theme", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Font Size</Label>
                      <Select
                        value={preferences.fontSize}
                        onValueChange={(value) =>
                          handlePreferenceChange("fontSize", value)
                        }
                      >
                        <SelectTrigger className="w-full md:w-1/2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                          <SelectItem value="extra-large">
                            Extra Large
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Accessibility</CardTitle>
                    <CardDescription>
                      Features to help make SmartVote more accessible
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Accessibility className="w-5 h-5 text-blue-600" />
                        <div>
                          <h4 className="font-medium">High Contrast Mode</h4>
                          <p className="text-sm text-gray-600">
                            Increase contrast for better visibility
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={preferences.accessibility}
                        onCheckedChange={(value) =>
                          handlePreferenceChange("accessibility", value)
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Account Management */}
            {activeTab === "account" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>
                      Overview of your SmartVote account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-sm text-gray-600">
                          Account Created
                        </h4>
                        <p className="font-medium">September 15, 2024</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-600">
                          Last Login
                        </h4>
                        <p className="font-medium">Today at 2:30 PM</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-600">
                          Elections Participated
                        </h4>
                        <p className="font-medium">7 elections</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-600">
                          Account Status
                        </h4>
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-700"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Support & Help</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <HelpCircle className="w-5 h-5 text-blue-600" />
                        <div>
                          <h4 className="font-medium">Help Center</h4>
                          <p className="text-sm text-gray-600">
                            Find answers to common questions
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Visit
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <div>
                          <h4 className="font-medium">Contact Support</h4>
                          <p className="text-sm text-gray-600">
                            Get help from our support team
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                    <CardDescription>
                      Irreversible actions that affect your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Alert className="mb-4">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Warning:</strong> Deactivating your account will
                        prevent you from participating in future elections. This
                        action can be reversed by contacting support.
                      </AlertDescription>
                    </Alert>
                    <Dialog
                      open={showDeleteDialog}
                      onOpenChange={setShowDeleteDialog}
                    >
                      <DialogTrigger asChild>
                        <Button variant="destructive" className="w-full">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Deactivate Account
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Deactivate Account</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to deactivate your account?
                            You will no longer be able to participate in
                            elections or access your voting history.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setShowDeleteDialog(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => setShowDeleteDialog(false)}
                          >
                            Deactivate Account
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
