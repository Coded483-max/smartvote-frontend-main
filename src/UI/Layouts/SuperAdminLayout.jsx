import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { Button } from "../../components/ui/button";
import { Menu, X } from "lucide-react";

import SuperAdminHeader from "../Headers/SuperAdminHeader";
import SuperAdminSiderbar from "../Siderbars/SuperAdminSiderbar";
import { useSuperAdminLogoutMutation } from "@/api/superAdminsApiSlice";
import { useDispatch } from "react-redux";
import { logoutSuperAdmin } from "@/api/authSlice";
import { useNavigate } from "react-router-dom";

const SuperAdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  console.log(activeTab, "activeTab in CandidateLayout");

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const [superAdminLogout] = useSuperAdminLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutSuperAdminHandler = async () => {
    try {
      await superAdminLogout().unwrap();
      dispatch(logoutSuperAdmin());
      localStorage.clear(); // Clear local storage
      navigate("/super-admin/login", { replace: true }); // Navigate to home instead of login
      // toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="relative block md:grid md:grid-cols-[20rem_1fr] md:grid-rows-[auto_1fr] h-screen">
      <header className="relative  col-span-2 row-span-1 z-10">
        <SuperAdminHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleSidebarToggle={handleSidebarToggle}
          handleLogout={logoutSuperAdminHandler}
        />
      </header>
      <aside>
        <SuperAdminSiderbar activeTab={activeTab} setActiveTab={setActiveTab} />
      </aside>
      <main className="overflow-y-auto overflow-x-hidden h-full p-0 col-start-2 row-start-2">
        <div className="flex flex-col gap-12">
          <Outlet context={{ activeTab, setActiveTab }} />
        </div>
      </main>
      <div>
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-transparent bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }  justify-center items-center  lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50  h-full bg-gray-50 shadow-lg transition-transform duration-200 ease-in-out lg:hidden `}
        >
          {/* <MainNav /> */}
          <SuperAdminSiderbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </aside>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
