import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  useGetMyApplicationsQuery,
  useLogoutMutation,
} from "@/api/candidateApi";
import { logout } from "@/api/authSlice";
import { useNavigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import CandidateSidebar from "../Siderbars/CandidateSidebar";
import CandidateHeader from "../Headers/CandidateHeader";

const CandidateLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview"); // <-- Move state here
  const [showEventModal, setShowEventModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [showSocialAccountModal, setShowSocialAccountModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("");

  const tabMap = {
    "/candidate/overview": "overview",
    "/candidate/platform-issues": "platform",
    "/candidate/voting-info": "voting",
    "/candidate/elections": "elections",
    "/candidate/events": "events",
    "/candidate/budget": "budget",
    "/candidate/social": "social",
    "/candidate/profile": "profile",
    "/candidate/forum": "forum",
  };

  // Sync activeTab with current route
  React.useEffect(() => {
    const tab = tabMap[location.pathname];
    if (tab) setActiveTab(tab);
  }, [location.pathname]);

  console.log(activeTab, "activeTab in CandidateLayout");

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const { candidate } = useSelector((state) => state.auth);
  const { data: applications } = useGetMyApplicationsQuery();
  const [logoutApi] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      localStorage.clear();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const initials =
    candidate.firstName && candidate.lastName
      ? `${candidate.firstName.charAt(0)}${candidate.lastName.charAt(0)}`
      : candidate.email.charAt(0).toUpperCase();

  return (
    <div className="relative block md:grid md:grid-cols-[20rem_1fr] md:grid-rows-[auto_1fr] h-screen bg-purple-50">
      <header className="relative col-span-2 row-span-1 z-10">
        <CandidateHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleSidebarToggle={handleSidebarToggle}
          initials={initials}
          candidate={candidate}
          applications={applications}
          handleLogout={handleLogout}
        />
      </header>
      <aside>
        <CandidateSidebar
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          applications={applications}
          initials={initials}
          candidate={candidate}
        />
      </aside>
      <main className="overflow-y-auto overflow-x-hidden h-full pt-18 col-start-2 row-start-2">
        <div className="flex flex-col gap-12">
          <Outlet
            context={{
              activeTab,
              setActiveTab,
              showEventModal,
              setShowEventModal,
              showExpenseModal,
              setShowExpenseModal,
              showPostModal,
              setShowPostModal,
              showIssueModal,
              setShowIssueModal,
              showSocialAccountModal,
              setShowSocialAccountModal,
              selectedPlatform,
              setSelectedPlatform,
            }}
          />
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
          } justify-center items-center lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 h-full bg-gray-50 shadow-lg transition-transform duration-200 ease-in-out lg:hidden`}
        >
          {/* <MainNav /> */}
          <CandidateSidebar setActiveTab={setActiveTab} activeTab={activeTab} />
        </aside>
      </div>
    </div>
  );
};

export default CandidateLayout;
