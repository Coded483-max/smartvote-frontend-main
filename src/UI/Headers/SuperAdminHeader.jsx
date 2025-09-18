import React from "react";
import Logo from "../../UI/Logo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Bell } from "lucide-react";
import { LuLogOut } from "react-icons/lu";

const SuperAdminHeader = ({ handleLogout }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="flex flex-col items-center">
              <Logo className="h-8 w-8" />
              <p className="text-sm text-gray-500">
                System Administration Dashboard
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-4"></div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="/placeholder.svg?height=32&width=32"
              alt="Super Admin"
            />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
          <Button variant="outline" size="icon" onClick={handleLogout}>
            <LuLogOut size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default SuperAdminHeader;
