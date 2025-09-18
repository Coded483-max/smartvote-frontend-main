import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Button } from "../components/ui/button";
import { Menu, X } from "lucide-react";
import MainNav from "./MainNav";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="relative block md:grid md:grid-cols-[20rem_1fr] md:grid-rows-[auto_1fr] h-screen">
      <header className="relative  col-span-2 row-span-1 z-10">
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleSidebarToggle={handleSidebarToggle}
        />
      </header>
      <aside className="hidden md:block row-span-1 absolute z-20 h-full">
        <Sidebar />
      </aside>
      <main className="bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-y-auto overflow-x-hidden h-full p-10 col-start-2 row-start-2">
        <div className="  flex flex-col gap-12">
          <Outlet />
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
          <Sidebar />
        </aside>
      </div>
    </div>
  );
};

export default AppLayout;
