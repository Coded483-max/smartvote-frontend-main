import { useState, useEffect } from "react";
import { useNavigate, useOutletContext, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  useLogoutMutation,
  useGetMyApplicationsQuery,
} from "@/api/candidateApi";
import { logout } from "@/api/authSlice";
import { useDispatch } from "react-redux";
import Elections from "@/pages/Election";
import PlatformIssues from "@/pages/auth/candidate/components/PlatformIssues";
import VotingInfo from "@/pages/auth/candidate/components/VotingInfo";
import Overview from "@/pages/auth/candidate/components/Overview";
import Events from "@/pages/auth/candidate/components/Events";
import Budget from "@/pages/auth/candidate/components/Budget";
import Social from "@/pages/auth/candidate/components/Social";

import CandidateElections from "@/UI/CandidateElections";
const tabMap = {
  "/candidate/overview": "overview",
  "/candidate/platform-issues": "platform",
  "/candidate/voting-info": "voting",
  "/candidate/elections": "elections",
  "/candidate/events": "events",
  "/candidate/budget": "budget",
  "/candidate/social": "social",
  "/candidate/profile": "profile",
};

const CandidateDashboard = () => {
  // const { activeTab } = useOutletContext();
  const outletContext = useOutletContext();
  console.log("Outlet context:", outletContext);

  const {
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
  } = outletContext;

  useEffect(() => {
    const tab = tabMap[location.pathname];
    if (tab) setActiveTab(tab);
  }, [setActiveTab]);

  const { data: applications, isLoading: applicationsLoading } =
    useGetMyApplicationsQuery();

  if (applicationsLoading) {
    <div>Loading applications...</div>;
  }

  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [connectedAccounts, setConnectedAccounts] = useState({
    instagram: { connected: true, username: "@alexsmith2024" },
    tiktok: { connected: true, username: "@alexforpresident" },
    twitter: { connected: false, username: "" },
    facebook: { connected: false, username: "" },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { candidate } = useSelector((state) => state.auth);

  console.log(candidate);

  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      localStorage.clear(); // Clear local storage
      navigate("/", { replace: true }); // Navigate to home instead of login
      // toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 p-6">
          {location.pathname === "/candidate/overview" && (
            <Overview
              setShowEventModal={setShowEventModal}
              setShowExpenseModal={setShowExpenseModal}
              setShowPostModal={setShowPostModal}
              setShowIssueModal={setShowIssueModal}
              setShowSocialAccountModal={setShowSocialAccountModal}
            />
          )}

          {location.pathname === "/candidate/platform-issues" && (
            <PlatformIssues
              setShowIssueModal={setShowIssueModal}
              showIssueModal={showIssueModal}
            />
          )}

          {location.pathname === "/candidate/voting-info" && <VotingInfo />}

          {location.pathname === "/candidate/elections" && (
            <div className="space-y-6">
              <CandidateElections />
            </div>
          )}

          {location.pathname === "/candidate/events" && (
            <Events setShowEventModal={setShowEventModal} />
          )}

          {location.pathname === "/candidate/budget" && (
            <Budget setShowExpenseModal={setShowExpenseModal} />
          )}

          {location.pathname === "/candidate/social" && (
            <Social
              setShowSocialAccountModal={setShowSocialAccountModal}
              setSelectedPlatform={setSelectedPlatform}
              setShowPostModal={setShowPostModal}
            />
          )}
        </main>
      </div>

      {/* Modals */}
    </div>
  );
};

export default CandidateDashboard;
