import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useLogoutMutation } from "@/api/usersApiSlice";
import { logout } from "@/api/authSlice";

import { HiOutlineBell } from "react-icons/hi2";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import { HiOutlineSearch } from "react-icons/hi";
import { FiMenu, FiX } from "react-icons/fi";
import ProfileImage from "../assets/profile.jpeg";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Vote,
  Users,
  CalendarIcon,
  Clock,
  TrendingUp,
  Award,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Activity,
  BarChart3,
  PieChartIcon,
  CheckCircle,
  AlertCircle,
  Eye,
  Plus,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "./Sidebar";

const Header = ({ sidebarOpen, setSidebarOpen, handleSidebarToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutAPi, { isLoading }] = useLogoutMutation();
  // const { handleLogout } = useRoleLogout();

  // const onLogoutClick = () => {
  //   handleLogout("voter");
  // };

  const handleLogout = async () => {
    try {
      await logoutAPi().unwrap();
      dispatch(logout());
      localStorage.clear(); // Clear local storage
      navigate("/", { replace: true }); // Navigate to home instead of login
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={handleSidebarToggle}
                >
                  {sidebarOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </div>
              <div className="flex items-center space-x-2 ml-50">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Vote className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SmartVote
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/notifications">
                <Button className="cursor-pointer" variant="ghost" size="sm">
                  <Bell className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/settings">
                <Button className="cursor-pointer" variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/user-profile" className="flex items-center space-x-3">
                <div className="flex items-center space-x-3 cursor-pointer">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium">Solomon Cudjoe</p>
                    <p className="text-xs text-gray-500">Student</p>
                  </div>
                </div>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
