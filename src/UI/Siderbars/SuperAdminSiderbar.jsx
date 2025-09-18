import React from "react";
import { BarChart3, Users, Activity, Settings, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const SuperAdminSiderbar = ({ activeTab, setActiveTab }) => {
  return (
    <aside
      className="fixed left-0 top-22.5 w-64 h-[calc(100vh-4rem)]  border-r border-gray-200 z-50"
      style={{ overflow: "hidden" }}
    >
      <nav className="p-4 space-y-2">
        <Button
          variant={activeTab === "overview" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("overview")}
        >
          <BarChart3 className="mr-2 h-4 w-4" />
          Overview
        </Button>
        <Button
          variant={activeTab === "admins" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("admins")}
        >
          <Users className="mr-2 h-4 w-4" />
          Admin Management
        </Button>
        <Button
          variant={activeTab === "candidates" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("candidates")}
        >
          <Users className="mr-2 h-4 w-4" />
          Candidates
        </Button>
        {/* <Button
              variant={activeTab === "candidates" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("candidates")}
            >
              <Users className="mr-2 h-4 w-4" />
              Candidates Management
            </Button> */}
        <Button
          variant={activeTab === "elections" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("elections")}
        >
          <Activity className="mr-2 h-4 w-4" />
          Elections Overview
        </Button>
        {/* <Button
          variant={activeTab === "system" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("system")}
        >
          <Settings className="mr-2 h-4 w-4" />
          System Settings
        </Button> */}
        <Button
          variant={activeTab === "security" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveTab("security")}
        >
          <Lock className="mr-2 h-4 w-4" />
          Security & Logs
        </Button>
      </nav>
    </aside>
  );
};

export default SuperAdminSiderbar;
