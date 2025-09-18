import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  Users,
  Shield,
  Settings,
  BarChart3,
  Plus,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Activity,
  Database,
  Lock,
  Bell,
  Edit,
  Trash2,
  Eye,
  AlertTriangle,
  Server,
  Globe,
  Mail,
  Key,
} from "lucide-react";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

import Logo from "@/UI/Logo";
import ElectionCreationForm from "@/UI/ElectionCreationForm";
import FormModal from "@/UI/FormModal";
import CandidateTable from "@/UI/CandidateTable";
import Loader from "@/UI/Loader";

import { formatDateTime } from "@/hooks/DateAndTimeFormatter";

import {
  useCreateAdminMutation,
  useDeleteElectionMutation,
} from "@/api/superAdminsApiSlice";

import {
  useGetAllAdminsQuery,
  useGetElectionsQuery,
  useToggleElectionStatusMutation,
} from "@/api/superAdminsApiSlice";
import { useDashboardGuard } from "@/hooks/useDashboardGuard";
import { toast } from "react-toastify";
import ToastTest from "@/UI/ToastTest";
import SecurityLogsCard from "@/UI/SecurityLogsCard";
import ThreatDetectionCard from "@/UI/ThreatDetectionCard";
import BlockedIPsCard from "@/UI/BlockedIPsCard";
import SecurityOverview from "@/UI/SecurityOverview";
import SecurityLogsHeader from "@/UI/SecurityLogsHeader";

const SuperAdminDashboard = ({ error, setError, logoutSuperAdminHandler }) => {
  useDashboardGuard();

  const outletContext = useOutletContext();
  console.log("Outlet context:", outletContext);
  const { activeTab } = outletContext || {};

  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [showEditAdminModal, setShowEditAdminModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showElectionModal, setShowElectionModal] = useState(false);
  const [showSystemSettingsModal, setShowSystemSettingsModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const [createAdmin, { isLoading }] = useCreateAdminMutation();
  const {
    data: allAdmins,
    isLoading: adminsLoading,
    error: adminsError,
    refetch: refetchAdmins,
  } = useGetAllAdminsQuery();
  console.log(allAdmins, "All Admins");
  console.log(allAdmins?.admins?.length, "All Admins");

  const {
    data: elections = [],
    isLoading: electionsLoading,
    error: electionsError,
  } = useGetElectionsQuery();

  console.log(elections, "All Elections Data");

  const [deleteElection, { isLoading: deleteLoading }] =
    useDeleteElectionMutation();
  const handleDeleteElection = async (electionId) => {
    try {
      await deleteElection(electionId).unwrap();
      toast.success("Election deleted successfully");
    } catch (error) {
      console.error("Error deleting election:", error);
      toast.error("Failed to delete election");
    }
  };

  const safeElections = Array.isArray(elections) ? elections : [];

  console.log(safeElections, "Safe Elections Data");

  if (electionsError) {
    toast.error("Failed to fetch elections data");
  }

  if (safeElections.length === 0) {
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-gray-500">No elections available at the moment.</p>
    </div>;
  }

  const [toggleElectionStatus, { isLoading: toggleLoading }] =
    useToggleElectionStatusMutation();

  if (toggleLoading) {
    console.log("Toggling election status...");
  }

  const totalAdmins = allAdmins?.admins?.length || 0;

  const [newAdmin, setNewAdmin] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    permissions: [],
  });

  const adminRoles = [
    { value: "admin", label: "Admin" },
    { value: "Content Moderator", label: "Content Moderator" },
    { value: "System Admin", label: "System Admin" },
  ];

  const handleCreateAdmin = async (e) => {
    // Validation
    if (!newAdmin.firstName.trim()) {
      toast.error("First name is required");
      return;
    }

    if (!newAdmin.lastName.trim()) {
      toast.error("Last name is required");
      return;
    }

    if (!newAdmin.email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!newAdmin.password.trim()) {
      toast.error("Password is required");
      return;
    }
    if (!newAdmin.confirmPassword.trim()) {
      toast.error("Confirm Password is required");
      return;
    }

    if (newAdmin.password !== newAdmin.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!newAdmin.role) {
      toast.error("Role is required");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newAdmin.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Password validation
    if (newAdmin.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    try {
      const res = await createAdmin({ ...newAdmin }).unwrap();
      console.log("Response from admin creation: ", res);

      await refetchAdmins();

      // Reset form and close modal
      setNewAdmin({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
        permissions: [],
      });

      setShowAddAdminModal(false);
      toast.success("Admin created successfully!");
    } catch (error) {
      console.error("Error creating admin:", error);

      // Better error handling
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Failed to create admin. Please try again.";

      toast.error(errorMessage);
    }
  };

  const getElectionStatusColor = (status) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "candidate_registration":
        return "bg-blue-100 text-blue-800";
      case "campaign":
        return "bg-purple-100 text-purple-800";
      case "voting":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "suspended":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleToggleElectionStatus = async (electionId, newStatus) => {
    try {
      // Define the allowed status transitions from backend
      const statusTransitions = {
        draft: ["candidate_registration", "cancelled"],
        candidate_registration: ["campaign", "cancelled", "suspended"],
        campaign: ["voting", "cancelled", "suspended"],
        voting: ["completed", "cancelled", "suspended"],
        completed: [], // Final state - no transitions allowed
        cancelled: [], // Final state - no transitions allowed
        suspended: [
          "candidate_registration",
          "campaign",
          "voting",
          "cancelled",
        ], // Can resume to previous state
      };

      // Get current election to check its current status
      const currentElection = safeElections.find((e) => e._id === electionId);
      const currentStatus = currentElection?.status;

      // Check if the transition is allowed
      const allowedTransitions = statusTransitions[currentStatus] || [];

      if (!allowedTransitions.includes(newStatus)) {
        toast.error(
          `Cannot change status from ${currentStatus} to ${newStatus}`
        );
        return;
      }

      // Call the API to update the election status
      await toggleElectionStatus({
        electionId,
        status: newStatus,
      }).unwrap();

      // Show success toast with specific message
      const statusMessages = {
        draft: "Election moved to draft status",
        candidate_registration: "Election opened for candidate registration",
        campaign: "Election scheduled as campaign period",
        voting: "Election activated - voting enabled",
        suspended: "Election suspended temporarily",
        completed: "Election marked as completed",
        cancelled: "Election cancelled",
      };

      toast.success(
        statusMessages[newStatus] || `Election status updated to ${newStatus}`
      );
    } catch (error) {
      console.error("Error updating election status:", error);
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Failed to update election status";
      toast.error(errorMessage);
    }
  };

  // Mock data for admins
  const [admins, setAdmins] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@university.edu",
      role: "Election Admin",
      status: "active",
      lastLogin: "2 hours ago",
      permissions: ["manage_elections", "manage_candidates", "view_reports"],
      createdAt: "2024-01-15",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.j@university.edu",
      role: "Content Moderator",
      status: "active",
      lastLogin: "1 day ago",
      permissions: ["moderate_content", "manage_forum", "view_reports"],
      createdAt: "2024-01-20",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      firstName: "Mike",
      lastName: "Davis",
      email: "mike.davis@university.edu",
      role: "System Admin",
      status: "inactive",
      lastLogin: "1 week ago",
      permissions: ["system_settings", "user_management", "security_logs"],
      createdAt: "2024-01-10",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      firstName: "Emily",
      lastName: "Chen",
      email: "emily.chen@university.edu",
      role: "Election Admin",
      status: "pending",
      lastLogin: "Never",
      permissions: ["manage_elections"],
      createdAt: "2024-03-01",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Mock security logs
  const [securityLogs, setSecurityLogs] = useState([
    {
      id: 1,
      timestamp: "2024-03-07 14:30:22",
      event: "Admin Login",
      user: "john.smith@university.edu",
      ipAddress: "192.168.1.100",
      status: "Success",
      details: "Successful login from campus network",
    },
    {
      id: 2,
      timestamp: "2024-03-07 13:45:15",
      event: "Failed Login Attempt",
      user: "unknown@example.com",
      ipAddress: "203.0.113.45",
      status: "Failed",
      details: "Multiple failed login attempts detected",
    },
    {
      id: 3,
      timestamp: "2024-03-07 12:20:08",
      event: "Permission Change",
      user: "super.admin@university.edu",
      ipAddress: "192.168.1.50",
      status: "Success",
      details: "Updated permissions for sarah.j@university.edu",
    },
    {
      id: 4,
      timestamp: "2024-03-07 11:15:33",
      event: "System Settings Modified",
      user: "mike.davis@university.edu",
      ipAddress: "192.168.1.75",
      status: "Success",
      details: "Updated email notification settings",
    },
  ]);

  // const formatDateTime = (dateString) => {
  //   const date = new Date(dateString);
  //   const dateFormatted = date.toLocaleDateString();
  //   const timeFormatted = date.toLocaleTimeString([], {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   });
  //   return `${dateFormatted} ${timeFormatted}`;
  // };

  // Update the totalAdmins calculation
  // const totalAdmins = allAdmins?.admins?.length || admins.length;

  // Update systemStats to use dynamic data
  const systemStats = {
    totalAdmins: totalAdmins,
    activeAdmins: (allAdmins?.admins || admins).filter(
      (admin) => admin.status === "active"
    ).length,
    pendingAdmins: (allAdmins?.admins || admins).filter(
      (admin) => admin.status === "pending"
    ).length,
    totalElections: safeElections.length,
    activeElections: safeElections.filter((e) => e.status === "active").length,
    totalCandidates: 45,
    totalVoters: 8247,
    systemHealth: 98.5,
  };

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      admin: "John Smith",
      action: "Created new election",
      target: "Student Body President 2024",
      timestamp: "2 hours ago",
      type: "election",
    },
    {
      id: 2,
      admin: "Sarah Johnson",
      action: "Approved candidate",
      target: "Alex Rodriguez",
      timestamp: "4 hours ago",
      type: "candidate",
    },
    {
      id: 3,
      admin: "Super Admin",
      action: "Added new admin",
      target: "Emily Chen",
      timestamp: "1 day ago",
      type: "admin",
    },
    {
      id: 4,
      admin: "Mike Davis",
      action: "Updated system settings",
      target: "Email notifications",
      timestamp: "2 days ago",
      type: "system",
    },
  ];

  // Use API data if available, otherwise fallback to mock data
  const adminsList = allAdmins?.admins || admins;

  const filteredAdmins = adminsList.filter((admin) => {
    const matchesSearch =
      admin.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRole === "all" || admin.role === filterRole;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "candidate_registration":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "inactive":
        return <XCircle className="h-4 w-4 text-gray-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <XCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleEditAdmin = (admin) => {
    setSelectedAdmin(admin);
    setShowEditAdminModal(true);
  };

  const handleDeleteAdmin = (admin) => {
    setSelectedAdmin(admin);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteAdmin = () => {
    setAdmins(admins.filter((admin) => admin.id !== selectedAdmin.id));
    setShowDeleteConfirm(false);
    setSelectedAdmin(null);
    alert("Admin removed successfully!");
  };

  const handlePermissionChange = (permission) => {
    const updatedPermissions = newAdmin.permissions.includes(permission)
      ? newAdmin.permissions.filter((p) => p !== permission)
      : [...newAdmin.permissions, permission];
    setNewAdmin({ ...newAdmin, permissions: updatedPermissions });
  };

  const toggleAdminStatus = (adminId) => {
    setAdmins(
      admins.map((admin) =>
        admin.id === adminId
          ? {
              ...admin,
              status: admin.status === "active" ? "inactive" : "active",
            }
          : admin
      )
    );
  };

  // Update the handleCreateElection function
  // const handleCreateElection = () => {
  //   if (
  //     !newElection.title ||
  //     !newElection.type ||
  //     !newElection.startDate ||
  //     !newElection.endDate
  //   ) {
  //     alert("Please fill in all required fields");
  //     return;
  //   }

  //   const selectedType = electionTypes[newElection.type];
  //   if (selectedType.requiresDepartment && !newElection.department) {
  //     alert("Please select a department for this election type");
  //     return;
  //   }

  //   const electionToAdd = {
  //     id: elections.length + 1,
  //     ...newElection,
  //     status: "upcoming",
  //     candidates: 0,
  //     totalVotes: 0,
  //     eligibleVoters: Number.parseInt(newElection.eligibleVoters) || 0,
  //     positions:
  //       newElection.positions.length > 0
  //         ? newElection.positions
  //         : selectedType.defaultPositions,
  //     customSettings: {
  //       ...selectedType.settings,
  //       ...newElection.customSettings,
  //     },
  //   };

  //   setElections([...elections, electionToAdd]);
  //   setNewElection({
  //     title: "",
  //     type: "",
  //     startDate: "",
  //     endDate: "",
  //     department: "",
  //     positions: [],
  //     description: "",
  //     eligibleVoters: "",
  //     customSettings: {},
  //   });
  //   setShowElectionModal(false);
  //   alert("Election created successfully!");
  // };

  // Update the election type badge colors
  const getElectionTypeColor = (type) => {
    switch (type) {
      case "university":
        return "bg-blue-100 text-blue-800";
      case "departmental":
        return "bg-green-100 text-green-800";
      case "specialized":
        return "bg-purple-100 text-purple-800";
      case "residential":
        return "bg-orange-100 text-orange-800";
      case "class":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastTest />

      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">System Overview</h2>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">
                      System Healthy
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Admins
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalAdmins}</div>
                    <p className="text-xs text-muted-foreground">
                      {systemStats.activeAdmins} active,{" "}
                      {systemStats.pendingAdmins} pending
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Elections
                    </CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {systemStats.activeElections}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {systemStats.totalElections} total elections
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Voters
                    </CardTitle>
                    <Database className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {systemStats.totalVoters.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {systemStats.totalCandidates} candidates
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      System Health
                    </CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {systemStats.systemHealth}%
                    </div>
                    <p className="text-xs text-muted-foreground">
                      All systems operational
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Admin Activities</CardTitle>
                  <CardDescription>
                    Latest actions performed by administrators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center space-x-4 p-3 border rounded-lg"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {activity.admin
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">
                              {activity.admin}
                            </span>{" "}
                            {activity.action}{" "}
                            <span className="font-medium">
                              {activity.target}
                            </span>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {activity.timestamp}
                          </p>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {activity.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button
                      className="h-16 flex-col space-y-1"
                      onClick={() => setShowAddAdminModal(true)}
                    >
                      <Plus className="h-4 w-4" />
                      <span className="text-xs">Add Admin</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-16 flex-col space-y-1 bg-transparent"
                    >
                      <Activity className="h-4 w-4" />
                      <span className="text-xs">View Elections</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-16 flex-col space-y-1 bg-transparent"
                      onClick={() => setShowSystemSettingsModal(true)}
                    >
                      <Settings className="h-4 w-4" />
                      <span className="text-xs">System Settings</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-16 flex-col space-y-1 bg-transparent"
                    >
                      <Lock className="h-4 w-4" />
                      <span className="text-xs">Security Logs</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "admins" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Admin Management</h2>
                <Button onClick={() => setShowAddAdminModal(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Admin
                </Button>
              </div>

              {/* Search and Filter */}
              <div className="flex space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search admins..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Roles</option>
                  <option value="Election Admin">Election Admin</option>
                  <option value="Content Moderator">Content Moderator</option>
                  <option value="System Admin">System Admin</option>
                </select>
              </div>

              {/* Admin List */}
              {adminsLoading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                  <Loader />
                </div>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Administrators (
                      {Array.isArray(allAdmins?.admins)
                        ? allAdmins.admins.length
                        : 0}
                      )
                    </CardTitle>
                    <CardDescription>
                      Manage system administrators and their permissions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Array.isArray(allAdmins?.admins) &&
                      allAdmins?.admins.length === 0 ? (
                        <div className="text-center text-gray-500">
                          No administrators found.
                        </div>
                      ) : Array.isArray(allAdmins?.admins) ? (
                        allAdmins?.admins.map((admin) => {
                          // Calculate initials for each individual admin
                          const initials =
                            admin.firstName && admin.lastName
                              ? `${admin.firstName.charAt(
                                  0
                                )}${admin.lastName.charAt(0)}`
                              : admin.email.charAt(0).toUpperCase();

                          return (
                            <div
                              key={admin.id}
                              className="flex items-center justify-between p-4 border rounded-lg"
                            >
                              <div className="flex items-center space-x-4">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage
                                    src={admin.avatar || "/placeholder.svg"}
                                    alt={initials}
                                  />
                                  <AvatarFallback className="bg-gray-200 text-gray-900">
                                    {initials}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <h4 className="font-medium">
                                      {admin.firstName} {admin.lastName}
                                    </h4>
                                    {getStatusIcon(admin.status)}
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {admin.email}
                                  </p>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <Badge variant="outline">
                                      {admin.role}
                                    </Badge>
                                    <Badge
                                      className={getStatusColor(admin.status)}
                                    >
                                      {admin.status}
                                    </Badge>
                                  </div>
                                  {/* <div className="text-xs text-muted-foreground mt-1">
                                Permissions: {admin.permissions.join(", ")}
                              </div> */}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="text-right text-sm text-muted-foreground mr-4">
                                  <p>Last login: {admin.lastLogin}</p>
                                  <p>Added: {admin.createdAt}</p>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditAdmin(admin)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => toggleAdminStatus(admin.id)}
                                  className={
                                    admin.status === "active"
                                      ? "text-red-600"
                                      : "text-green-600"
                                  }
                                >
                                  {admin.status === "active" ? (
                                    <XCircle className="h-4 w-4" />
                                  ) : (
                                    <CheckCircle className="h-4 w-4" />
                                  )}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteAdmin(admin)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-600" />
                                </Button>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center text-gray-500">
                          Unable to load administrators.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
          {activeTab === "candidates" && <CandidateTable />}

          {activeTab === "elections" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Elections Overview</h2>
                <Button onClick={() => setShowElectionModal(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Election
                </Button>
              </div>

              {/* Election Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">
                      Active Elections
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {
                        safeElections.filter((e) => e.status === "voting")
                          .length
                      }
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Currently running
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">
                      Upcoming Elections
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {
                        safeElections.filter(
                          (e) => e.status === "candidate_registration"
                        ).length
                      }
                    </div>
                    <p className="text-xs text-muted-foreground">Scheduled</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">
                      Draft Elections
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {safeElections.filter((e) => e.status === "draft").length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      In preparation
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">
                      Total Votes Cast
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {safeElections
                        .reduce(
                          (sum, election) => sum + (election.votes.length || 0),
                          0
                        )
                        .toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      All elections
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Elections List */}
              <Card>
                <CardHeader>
                  <CardTitle>All Elections</CardTitle>
                  <CardDescription>
                    Monitor and manage all election campaigns
                  </CardDescription>
                </CardHeader>
                {electionsLoading ? (
                  <Loader />
                ) : safeElections && safeElections.length > 0 ? (
                  <CardContent>
                    <div className="space-y-4">
                      {safeElections.map((election) => (
                        <div
                          key={election._id}
                          className="p-4 border rounded-lg"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-medium">
                                  {election.title}
                                </h4>
                                <Badge
                                  className={getElectionTypeColor(
                                    election.type || election.level
                                  )}
                                >
                                  {election.level}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-1">
                                {formatDateTime(election.startDate)} to{" "}
                                {formatDateTime(election.endDate)}
                              </p>
                              {election.department && (
                                <p className="text-sm text-muted-foreground">
                                  Department: {election.department}
                                </p>
                              )}
                              <p className="text-xs text-muted-foreground mt-1">
                                {election.description}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                className={getElectionStatusColor(
                                  election.status
                                )}
                              >
                                {election.status}
                              </Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-4 gap-4 mt-3">
                            <div className="text-center">
                              <div className="text-lg font-bold">
                                {election.candidates?.length || 0}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Candidates
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold">
                                {(election.votes.length || 0).toLocaleString()}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Votes Cast
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold">
                                {election.eligibleVoters > 0
                                  ? (
                                      ((election.totalVotes || 0) /
                                        election.eligibleVoters) *
                                      100
                                    ).toFixed(1)
                                  : 0}
                                %
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Turnout
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold">
                                {election.positions?.length || 0}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Positions
                              </div>
                            </div>
                          </div>

                          <div className="mt-2">
                            <p className="text-xs text-muted-foreground">
                              Positions:&nbsp;
                              {election.positions
                                ?.map((position) => position.name)
                                .join(", ") || "None"}
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex justify-between items-center mt-4 pt-3 border-t">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  navigate(`/election/${election._id}`);
                                }}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View Details
                              </Button>

                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  console.log("Edit election:", election._id);
                                }}
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                            </div>

                            <div className="flex items-center space-x-2">
                              {/* Status Select Dropdown */}
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-muted-foreground">
                                  Status:
                                </span>
                                <Select
                                  value={election.status}
                                  onValueChange={(newStatus) =>
                                    handleToggleElectionStatus(
                                      election._id,
                                      newStatus
                                    )
                                  }
                                  disabled={toggleLoading}
                                >
                                  <SelectTrigger className="w-32 h-8">
                                    <SelectValue placeholder="Status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="draft">
                                      <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                                        <span>Draft</span>
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="candidate_registration">
                                      <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span>Candidate Registration</span>
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="campaign">
                                      <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                        <span>Campaign</span>
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="voting">
                                      <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span>Voting</span>
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="suspended">
                                      <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                        <span>Suspended</span>
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="completed">
                                      <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        <span>Completed</span>
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="cancelled">
                                      <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                        <span>Cancelled</span>
                                      </div>
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              {/* Delete Button */}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      `Are you sure you want to delete "${election.title}"? This action cannot be undone.`
                                    )
                                  ) {
                                    console.log(
                                      "Delete election:",
                                      election._id
                                    );
                                    handleDeleteElection(election._id);
                                  }
                                }}
                                className="text-red-600 border-red-300 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                ) : (
                  <CardContent>
                    <p className="text-center text-muted-foreground">
                      No elections found
                    </p>
                  </CardContent>
                )}
              </Card>
            </div>
          )}

          {/* {activeTab === "system" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">System Settings</h2>
                <Button onClick={() => setShowSystemSettingsModal(true)}>
                  <Settings className="mr-2 h-4 w-4" />
                  Update Settings
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Server Status
                    </CardTitle>
                    <Server className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      Online
                    </div>
                    <p className="text-xs text-muted-foreground">
                      99.9% uptime
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Database
                    </CardTitle>
                    <Database className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      Healthy
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Response time: 45ms
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      API Status
                    </CardTitle>
                    <Globe className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      Active
                    </div>
                    <p className="text-xs text-muted-foreground">
                      All endpoints operational
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Storage
                    </CardTitle>
                    <Database className="h-4 w-4 text-yellow-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">67%</div>
                    <p className="text-xs text-muted-foreground">
                      Used capacity
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Email Configuration</CardTitle>
                    <CardDescription>
                      SMTP and notification settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">SMTP Server</span>
                      <Badge variant="outline">smtp.university.edu</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Email Notifications</span>
                      <Badge className="bg-green-100 text-green-800">
                        Enabled
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Daily Reports</span>
                      <Badge className="bg-green-100 text-green-800">
                        Enabled
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Test Email Configuration
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Authentication and access control
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Two-Factor Authentication</span>
                      <Badge className="bg-green-100 text-green-800">
                        Required
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Session Timeout</span>
                      <Badge variant="outline">30 minutes</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Password Policy</span>
                      <Badge className="bg-green-100 text-green-800">
                        Strong
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                    >
                      <Key className="h-4 w-4 mr-2" />
                      Update Security Policy
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>System Performance</CardTitle>
                  <CardDescription>Real-time system metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>CPU Usage</span>
                        <span>23%</span>
                      </div>
                      <Progress value={23} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Memory Usage</span>
                        <span>45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Disk Usage</span>
                        <span>67%</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Network I/O</span>
                        <span>12%</span>
                      </div>
                      <Progress value={12} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )} */}

          {activeTab === "security" && (
            <div className="space-y-6">
              <SecurityLogsHeader />

              {/* Security Overview */}
              <SecurityOverview />

              {/* Security Logs */}

              <SecurityLogsCard getStatusColor={getStatusColor} />

              {/* Threat Detection */}

              <ThreatDetectionCard />

              <BlockedIPsCard />
            </div>
          )}
        </main>
      </div>

      {/* Add Admin Modal */}
      {showAddAdminModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowAddAdminModal(false);
            }
          }}
        >
          <div
            className="bg-white p-6 rounded-lg w-[30%] max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
          >
            <h3 className="text-lg font-semibold mb-4">
              Add New Administrator
            </h3>
            <div className="space-y-4">
              <div>
                <Label className="block text-sm font-medium mb-1">
                  First Name *
                </Label>
                <Input
                  type="text"
                  placeholder="John"
                  value={newAdmin.firstName}
                  onChange={(e) =>
                    setNewAdmin({
                      ...newAdmin,
                      firstName: e.target.value,
                    })
                  }
                  className="w-full"
                />
              </div>

              <div>
                <Label className="block text-sm font-medium mb-1">
                  Last Name *
                </Label>
                <Input
                  type="text"
                  placeholder="Doe"
                  value={newAdmin.lastName}
                  onChange={(e) =>
                    setNewAdmin({
                      ...newAdmin,
                      lastName: e.target.value,
                    })
                  }
                  className="w-full"
                />
              </div>

              <div>
                <Label className="block text-sm font-medium mb-1">
                  Email Address *
                </Label>
                <Input
                  type="email"
                  placeholder="john.doe@university.edu"
                  value={newAdmin.email}
                  onChange={(e) =>
                    setNewAdmin({
                      ...newAdmin,
                      email: e.target.value,
                    })
                  }
                  className="w-full"
                />
              </div>

              <div>
                <Label className="block text-sm font-medium mb-1">
                  Password *
                </Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={newAdmin.password}
                  onChange={(e) =>
                    setNewAdmin({
                      ...newAdmin,
                      password: e.target.value,
                    })
                  }
                  className="w-full"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-1">
                  Confirm Password *
                </Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={newAdmin.confirmPassword}
                  onChange={(e) =>
                    setNewAdmin({
                      ...newAdmin,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full"
                />
              </div>

              <div>
                <Label className="block text-sm font-medium mb-1">Role *</Label>
                <select
                  value={newAdmin.role}
                  onChange={(e) =>
                    setNewAdmin({
                      ...newAdmin,
                      role: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Role</option>
                  {adminRoles.map((roleOption) => (
                    <option key={roleOption.value} value={roleOption.value}>
                      {roleOption.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="block text-sm font-medium mb-1">
                  Permissions
                </Label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {[
                    "manage_elections",
                    "manage_candidates",
                    "moderate_content",
                    "manage_forum",
                    "system_settings",
                    "user_management",
                    "security_logs",
                    "view_reports",
                  ].map((permission) => (
                    <label key={permission} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newAdmin.permissions.includes(permission)}
                        onChange={() => handlePermissionChange(permission)}
                        className="mr-2"
                      />
                      <span className="text-sm capitalize">
                        {permission.replace(/_/g, " ")}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddAdminModal(false);
                    setNewAdmin({
                      firstName: "",
                      lastName: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                      role: "",
                      permissions: [],
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateAdmin} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    "Send Invitation"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="text-muted-foreground mb-4">
              Are you sure you want to remove{" "}
              <strong>{selectedAdmin?.name}</strong> as an administrator? This
              action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDeleteAdmin}>
                Remove Admin
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* System Settings Modal
      {showSystemSettingsModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowSystemSettingsModal(false)}
        >
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">System Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  System Name
                </label>
                <input
                  type="text"
                  defaultValue="SmartVote University"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Admin Email
                </label>
                <input
                  type="email"
                  defaultValue="admin@university.edu"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Session Timeout (minutes)
                </label>
                <input
                  type="number"
                  defaultValue="30"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowSystemSettingsModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    alert("Settings updated successfully!");
                    setShowSystemSettingsModal(false);
                  }}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* Election Modal */}
      <FormModal
        isOpen={showElectionModal}
        onClose={() => setShowElectionModal(false)}
        className="max-w-6xl"
      >
        <ElectionCreationForm
          error={error}
          setError={setError}
          isModal={true}
          onClose={() => setShowElectionModal(false)}
        />
      </FormModal>
    </div>
  );
};

export default SuperAdminDashboard;
