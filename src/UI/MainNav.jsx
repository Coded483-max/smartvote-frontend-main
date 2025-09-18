import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

import { useLogoutMutation } from "@/api/usersApiSlice";
import { logout } from "@/api/authSlice";
import { toast } from "react-toastify";

import { HiOutlineHome } from "react-icons/hi";
import {
  HiChevronRight,
  HiOutlineCog6Tooth,
  HiArrowLeftOnRectangle,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";
import { Info, List, User } from "lucide-react";
import { AiOutlineUser } from "react-icons/ai";
import ProfileImage from "../assets/profile.jpeg";
import { useRoleLogout } from "@/hooks/useRoleLogout";

const MainNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutAPi, { isLoading }] = useLogoutMutation();
  // const { handleLogout } = useRoleLogout();

  // const onLogoutClick = () => {
  //   handleLogout("voter");
  // };
  const { voter } = useSelector((state) => state.auth);

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
    <div>
      {/* User Profile Section */}
      <div className="flex flex-col justify-center items-center h-fit">
        <div className="w-full h-full flex flex-col justify-center items-center ">
          <img
            src={ProfileImage || "/placeholder.svg"}
            alt="image"
            className="w-30 h-30 rounded-full border-2 border-blue-200"
          />
        </div>
        <p className="text-sm text-blue-900">
          {voter.firstName} {voter.lastName}
        </p>

        <div className="flex justify-center items-center gap-2 pt-4">
          <Link
            to="/user-profile"
            className="flex justify-center items-center text-blue-900 text-xs font-normal"
          >
            View Profile
            <HiChevronRight size={12} className="text-blue-900" />
          </Link>
        </div>
      </div>

      {/* Navigation List */}
      <ul className="flex flex-col gap-7 w-100  -ml-[50px] pt-12">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex flex-row justify-start items-center py-3 w-70 gap-5 -ml-[50px]  text-blue-900 text-xl font-medium transition-all duration-300 ${
                isActive
                  ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                  : "hover:text-white hover:bg-gradient-to-r from-blue-600 to-purple-600 hover:rounded-full"
              }`
            }
          >
            <div className="mx-10 flex justify-end items-center gap-5">
              <HiOutlineHome className="w-6 h-6 text-gray-400 transition-all duration-300 group-hover:text-white ml-5" />
              <span className="text-[16px]">Dashboard</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/elections"
            className={({ isActive }) =>
              `flex flex-row justify-start items-center py-3 w-70 gap-5 -ml-[50px]  text-blue-900 text-xl font-medium transition-all duration-300 ${
                isActive
                  ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                  : "hover:text-white hover:bg-gradient-to-r from-blue-600 to-purple-600 hover:rounded-full"
              }`
            }
          >
            <div className="mx-10 flex justify-center items-center gap-5">
              <User className="w-6 h-6 text-gray-400 transition-all duration-300 ml-5" />
              <span className="text-[16px]">Elections</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/forum"
            className={({ isActive }) =>
              `flex flex-row justify-start items-center py-3 w-70 gap-5 -ml-[50px]  text-blue-900 text-xl font-medium transition-all duration-300 ${
                isActive
                  ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                  : "hover:text-white hover:bg-gradient-to-r from-blue-600 to-purple-600 hover:rounded-full"
              }`
            }
          >
            <div className="mx-10 flex justify-center items-center gap-5">
              <User className="w-6 h-6 text-gray-400 transition-all duration-300 ml-5" />
              <span className="text-[16px]">Forum</span>
            </div>
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            to="/vote"
            className={({ isActive }) =>
              `flex flex-row justify-start items-center py-3 w-70 gap-5 -ml-[50px]  text-blue-900 text-xl font-medium transition-all duration-300 ${
                isActive
                  ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                  : "hover:text-white hover:bg-gradient-to-r from-blue-600 to-purple-600 hover:rounded-full"
              }`
            }
          >
            <div className="mx-10 flex justify-center items-center gap-5">
              <User className="w-6 h-6 text-gray-400 transition-all duration-300 ml-5" />
              <span className="text-[16px]">Vote</span>
            </div>
          </NavLink>
        </li> */}

        <li className="w-50">
          <NavLink
            to="/voters-guidelines"
            className={({ isActive }) =>
              `flex flex-row justify-start items-center py-3 w-70 gap-5 -ml-[50px] text-blue-900 text-xl font-medium transition-all duration-300 ${
                isActive
                  ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                  : "hover:text-white hover:bg-gradient-to-r from-blue-600 to-purple-600 hover:rounded-full"
              }`
            }
          >
            <div className="mx-10 flex justify-center items-center gap-5">
              <List className="w-6 h-6 text-gray-400 transition-all duration-300 ml-5" />
              <span className="text-[16px]">Voters Guidelines</span>
            </div>
          </NavLink>
        </li>
        <li className="w-50">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex flex-row justify-start items-center py-3 w-70 gap-5 -ml-[50px]  text-blue-900 text-xl font-medium transition-all duration-300 ${
                isActive
                  ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                  : "hover:text-white hover:bg-gradient-to-r from-blue-600 to-purple-600 hover:rounded-full"
              }`
            }
          >
            <div className="mx-10 flex justify-around items-center gap-5">
              <HiOutlineCog6Tooth className="w-6 h-6 text-gray-400 transition-all duration-300 ml-5" />
              <span className="text-[16px]">Settings</span>
            </div>
          </NavLink>
        </li>
      </ul>

      {/* Logout Button */}
      <div
        className="flex justify-center items-center pt-50"
        onClick={handleLogout}
      >
        <Button className="w-50 font-bold text-[16px] bg-transparent text-blue-900 hover:bg-gradient-to-r from-blue-600 to-purple-600 hover:text-blue-50 transition-all duration-500">
          <HiArrowLeftOnRectangle size={20} />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default MainNav;
