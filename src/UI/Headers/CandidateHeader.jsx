import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Bell } from "lucide-react";
import { LuLogOut } from "react-icons/lu";
import Logo from "../Logo";

const CandidateHeader = ({
  initials,
  candidate,
  applications,
  handleLogout,
}) => {
  console.log(applications, "applications in CandidateHeader");
  return (
    <header className="fixed top-0 left-0 right-0 h-18 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-200 px-6 py-4 z-50 shadow-sm">
      <div className="flex items-center justify-between mx-10">
        <Logo />

        <div className="flex items-center space-x-4">
          {/* <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 h-4 w-4" />
            <Input
              placeholder="Search..."
              className="pl-10 w-64 border-purple-200 focus:border-purple-400 focus:ring-purple-400 bg-white"
            />
          </div> */}
          <Button
            variant="outline"
            size="icon"
            className="border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400"
            onClick={() => alert("3 new notifications")}
          >
            <Bell className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400"
            onClick={handleLogout}
          >
            <LuLogOut size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default CandidateHeader;
