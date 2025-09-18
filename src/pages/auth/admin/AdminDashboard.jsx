import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import OverviewCards from "../../../UI/OverviewCards";
import CandidatesTable from "../../../UI/CandidateTable";
import VotingChart from "../../../UI/VotingChart";
import ElectionSettings from "../../../UI/ElectionSettings";
import Logo from "@/UI/Logo";
import {
  LayoutDashboard,
  Users,
  Vote,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDashboardGuard } from "@/hooks/useDashboardGuard";
import { useRoleLogout } from "@/hooks/useRoleLogout";
import { useAdminLogoutMutation } from "@/api/adminsApiSlice";
import { logoutAdmin } from "@/api/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  useDashboardGuard();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const { admin } = useSelector((state) => state.auth);

  const [adminLogout] = useAdminLogoutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await adminLogout().unwrap();
      dispatch(logoutAdmin());
      localStorage.clear();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const initials =
    admin.firstName && admin.lastName
      ? `${admin.firstName.charAt(0)}${admin.lastName.charAt(0)}`
      : admin.email.charAt(0).toUpperCase();

  const navigationItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "candidates", label: "Candidates", icon: Users },
    { id: "voting", label: "Voting", icon: Vote },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
            <div className="flex flex-col items-center  space-x-2">
              {/* <p className="text-sm text-gray-500">
                University Student Government Elections 2024
              </p> */}
              <Logo />
              <h1 className="text-[16px] font-semibold text-gray-900">
                Admin Dashboard
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
              <Badge className="ml-1 bg-red-500 text-white text-xs">3</Badge>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={admin.avatar || "/placeholder.svg"}
                    alt={initials}
                  />
                  <AvatarFallback className="bg-gray-200 text-gray-900">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                {/* <p className="text-xs text-gray-500">{admin.email}</p> */}
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-200 ease-in-out min-h-screen`}
        >
          <div className="p-4 border-b">
            <div className="flex items-center space-x-2">
              {/* <div className="bg-blue-600 p-2 rounded-lg">
                <Vote className="h-6 w-6 text-white" />
              </div> */}
              <div>
                {/* <h2 className="font-semibold text-gray-900">VoteAdmin</h2> */}
                <p className="text-xs text-gray-500">Election Management</p>
              </div>
            </div>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <Button
                    variant={activeTab === item.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="overview" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Election Overview
                </h2>
                <p className="text-gray-600">
                  Monitor the current election status and key metrics
                </p>
              </div>
              <OverviewCards />
              <VotingChart />
            </TabsContent>

            <TabsContent value="candidates" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Candidate Management
                </h2>
                <p className="text-gray-600">
                  Review and manage candidate applications
                </p>
              </div>
              <CandidatesTable />
            </TabsContent>

            <TabsContent value="voting" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Voting Management
                </h2>
                <p className="text-gray-600">
                  Monitor voting activity and manage the voting process
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Active Voters
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,247</div>
                    <p className="text-xs text-green-600">Currently voting</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Votes/Hour
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">342</div>
                    <p className="text-xs text-blue-600">Average rate</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      System Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      Online
                    </div>
                    <p className="text-xs text-gray-500">
                      All systems operational
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Time Remaining
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">14h 32m</div>
                    <p className="text-xs text-orange-600">Until voting ends</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Voting Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-4">
                    <Button className="bg-green-600 hover:bg-green-700">
                      Start Voting
                    </Button>
                    <Button variant="outline">Pause Voting</Button>
                    <Button variant="destructive">End Voting</Button>
                  </div>
                  <div className="flex space-x-4">
                    <Button variant="outline">Export Results</Button>
                    <Button variant="outline">Generate Report</Button>
                    <Button variant="outline">Send Notifications</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Election Analytics
                </h2>
                <p className="text-gray-600">
                  Detailed insights and voting patterns
                </p>
              </div>
              <VotingChart />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Voting by Faculty</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { faculty: "Engineering", votes: 2847, percentage: 32 },
                        { faculty: "Business", votes: 2134, percentage: 24 },
                        {
                          faculty: "Arts & Sciences",
                          votes: 1876,
                          percentage: 21,
                        },
                        { faculty: "Medicine", votes: 1234, percentage: 14 },
                        { faculty: "Law", votes: 841, percentage: 9 },
                      ].map((item) => (
                        <div
                          key={item.faculty}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm font-medium">
                            {item.faculty}
                          </span>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">
                              {item.votes}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Voting Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { time: "08:00", votes: 234 },
                        { time: "10:00", votes: 567 },
                        { time: "12:00", votes: 1234 },
                        { time: "14:00", votes: 1876 },
                        { time: "16:00", votes: 2341 },
                        { time: "18:00", votes: 2847 },
                      ].map((item) => (
                        <div
                          key={item.time}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm font-medium">
                            {item.time}
                          </span>
                          <span className="text-sm text-gray-600">
                            {item.votes} votes
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Election Settings
                </h2>
                <p className="text-gray-600">
                  Configure election parameters and system settings
                </p>
              </div>
              <ElectionSettings />
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};
export default AdminDashboard;
