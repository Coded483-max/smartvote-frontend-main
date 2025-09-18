import React from "react";
import {
  BarChart3,
  FileText,
  Vote,
  Calendar,
  DollarSign,
  MessageSquare,
} from "lucide-react";
import { HiChevronRight } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const CandidateSidebar = ({ applications, initials, candidate }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const linkBaseStyles =
    "flex items-center w-full justify-start px-4 py-2 rounded-md text-sm font-medium transition-colors no-underline";

  return (
    <aside
      className="fixed left-0 top-18 w-64 h-[calc(100vh-4rem)] bg-purple-50 border-r border-purple-200 z-50"
      style={{ overflow: "hidden" }}
    >
      <div className="flex flex-col justify-center items-center space-x-4 my-3">
        <div className="flex flex-col justify-center items-center space-x-3">
          <Avatar className="h-20 w-20 ring-2 ring-purple-200">
            <AvatarImage
              src={
                applications?.applications?.[0]?.photoUrl ||
                "/placeholder.svg?height=32&width=32"
              }
              alt="Candidate"
              crossOrigin="anonymous"
            />
            <AvatarFallback className="bg-purple-600 text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-semibold text-purple-900">
              {candidate?.firstName} {candidate?.lastName}
            </h1>
            <p className="text-sm text-purple-600">
              {applications &&
              Array.isArray(applications.applications) &&
              applications.applications.length > 0
                ? applications.applications[0].position
                : "No position selected"}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-2 pt-4">
          <Link
            to="/candidate/profile"
            className="flex justify-center items-center text-purple-900 text-xs font-normal"
          >
            View Profile
            <HiChevronRight size={12} className="text-purple-900" />
          </Link>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        <Link
          to="/candidate/overview"
          className={`${linkBaseStyles} ${
            location.pathname === "/candidate/overview"
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "text-purple-700 hover:bg-purple-100 hover:text-purple-800"
          }`}
        >
          <BarChart3 className="mr-2 h-4 w-4" />
          Overview
        </Link>

        <Link
          to="/candidate/platform-issues"
          className={`${linkBaseStyles} ${
            location.pathname === "/candidate/platform-issues"
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "text-purple-700 hover:bg-purple-100 hover:text-purple-800"
          }`}
        >
          <FileText className="mr-2 h-4 w-4" />
          Platform & Issues
        </Link>
        <Link
          to="/candidate/forum"
          className={`${linkBaseStyles} ${
            location.pathname === "/candidate/forum"
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "text-purple-700 hover:bg-purple-100 hover:text-purple-800"
          }`}
        >
          <FileText className="mr-2 h-4 w-4" />
          Forum
        </Link>

        <Link
          to="/candidate/voting-info"
          className={`${linkBaseStyles} ${
            location.pathname === "/candidate/voting-info"
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "text-purple-700 hover:bg-purple-100 hover:text-purple-800"
          }`}
        >
          <Vote className="mr-2 h-4 w-4" />
          Voting Info
        </Link>

        <Link
          to="/candidate/elections"
          className={`${linkBaseStyles} ${
            location.pathname === "/candidate/elections"
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "text-purple-700 hover:bg-purple-100 hover:text-purple-800"
          }`}
        >
          <Vote className="mr-2 h-4 w-4" />
          Elections
        </Link>

        <Link
          to="/candidate/events"
          className={`${linkBaseStyles} ${
            location.pathname === "/candidate/events"
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "text-purple-700 hover:bg-purple-100 hover:text-purple-800"
          }`}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Events
        </Link>

        <Link
          to="/candidate/budget"
          className={`${linkBaseStyles} ${
            location.pathname === "/candidate/budget"
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "text-purple-700 hover:bg-purple-100 hover:text-purple-800"
          }`}
        >
          <DollarSign className="mr-2 h-4 w-4" />
          Budget
        </Link>

        <Link
          to="/candidate/social"
          className={`${linkBaseStyles} ${
            location.pathname === "/candidate/social"
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "text-purple-700 hover:bg-purple-100 hover:text-purple-800"
          }`}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Social Media
        </Link>
      </nav>
    </aside>
  );
};

export default CandidateSidebar;
