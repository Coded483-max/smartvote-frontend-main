import { createRoot } from "react-dom/client";
import "./index.css";
import store from "./api/store";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";

import { HelmetProvider } from "react-helmet-async";
import AuthLayout from "./UI/AuthLayout";
import MainLayout from "./UI/MainLayout";
import AppLayout from "./UI/AppLayout";
import Home from "./pages/Home";
import Vote from "./pages/Vote";
import Dashboard from "./pages/Dashboard";
import VotersGuidelines from "./pages/VotersGuidelines";
import Settings from "./pages/Settings";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";
import Help from "./pages/Help";
import Notifications from "./pages/Notifications";
import UserProfile from "./pages/UserProfile";
import FAQs from "./pages/FAQs";
import ContactUs from "./pages/ContactUs";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyResetCode from "./pages/auth/VerifyResetCode";
import VerifyResetCodeSMS from "./pages/auth/VerifyResetCodeSMS";
import AboutUs from "./pages/AboutUs";
import Election from "./pages/Election";

import AdminLogin from "./pages/auth/admin/AdminLogin";
import AdminDashboard from "./pages/auth/admin/AdminDashboard";

import SuperAdminDashboard from "./pages/auth/super admin/SuperAdminDashboard";
import SuperAdminLogin from "./pages/auth/super admin/SuperAdminLogin";

//Candidate
import CandidateRegistration from "./pages/auth/candidate/CandidateRegistration";
import CandidateDashboard from "./pages/auth/candidate/CandidateDashboard";
import CandidateProfile from "./pages/auth/candidate/CandidateProfile";
// import ElectionDetailsForCandidate from "./pages/auth/candidate/ElectionDetailsForCandidate";
import Overview from "./pages/auth/candidate/components/Overview";
import Budget from "./pages/auth/candidate/components/Budget";
import Events from "./pages/auth/candidate/components/Events";
import PlatformIssues from "./pages/auth/candidate/components/PlatformIssues";
import Social from "./pages/auth/candidate/components/Social";
import VotingInfo from "./pages/auth/candidate/components/VotingInfo";

import PrivateRoute from "./Guards/PrivateRoute";
import AuthGuard from "./Guards/AuthGuard";
import PublicRoute from "./UI/PublicRoute";
import AdminRoutesGuard from "./Guards/AdminRoutesGuard";
import CandidateRoutesGuard from "./Guards/CandidateRoutesGuard";
import SharedGuard from "./Guards/SharedGuard";
import SuperAdminRoutesGuard from "./Guards/SuperAdminRoutesGuard";
import VotePage from "./pages/Vote";
import ElectionDetails from "./pages/ElectionDetails";
import CandidateLayout from "./UI/Layouts/CandidateLayout";
import SuperAdminLayout from "./UI/Layouts/SuperAdminLayout";
import ElectionDetailsForAdmin from "./pages/auth/super admin/ElectionDetailsForAdmin";
import CandidateRegistrationLanding from "./pages/CandidateRegistrationLanding";
import CandidateElections from "./UI/CandidateElections";
import Profile from "./pages/auth/candidate/Profile";
import CandidateForum from "./pages/auth/candidate/components/CandidateForum";
import VoterForum from "./pages/VoterForum";

// Router
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public routes - no guards */}
      <Route element={<PublicRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route
            path="/candidate-registration"
            element={<CandidateRegistrationLanding />}
          />
          <Route
            path="/register/candidate/:electionId"
            element={<CandidateRegistration />}
          />
        </Route>
      </Route>
      {/* Protected routes - require verified user */}
      <Route element={<AppLayout />}>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/elections" element={<Election />} />
          {/* <Route path="/elections/:electionId" element={<ElectionDetails />} /> */}
          <Route path="/vote/:electionId" element={<VotePage />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/voters-guidelines" element={<VotersGuidelines />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/help" element={<Help />} />
          <Route path="/forum" element={<VoterForum />} />
        </Route>
      </Route>
      {/* Auth routes - redirect if already verified */}
      <Route element={<AuthLayout />}>
        <Route element={<AuthGuard />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verify-reset-code" element={<VerifyResetCode />} />
          <Route
            path="/verify-reset-code-sms"
            element={<VerifyResetCodeSMS />}
          />

          {/* <Route path="/candidate/dashboard" element={<CandidateDashboard />} /> */}
        </Route>

        <Route element={<SharedGuard />}>
          <Route path="/elections/:electionId" element={<ElectionDetails />} />
        </Route>
        {/* Verify email - special case, no redirect */}
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Route>
      {/* Super Admin routes - separate logic */}
      {/* <Route
          path="/super-admin/dashboard"
          element={<SuperAdminDashboard />}
        /> */}
      {/* Candidate routes */}

      <Route path="/candidate" element={<CandidateLayout />}>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<CandidateDashboard />} />
        <Route path="platform-issues" element={<PlatformIssues />} />

        <Route path="voting-info" element={<VotingInfo />} />
        <Route path="elections" element={<CandidateElections />} />
        {/* <Route path="elections/:electionId" element={<ElectionDetails />} /> */}
        <Route path="events" element={<Events />} />
        <Route path="budget" element={<Budget />} />
        <Route path="social" element={<Social />} />
        <Route path="profile" element={<Profile />} />
        <Route path="forum" element={<CandidateForum />} />
      </Route>
      {/* Super Admin routes */}
      <Route element={<AuthGuard />}>
        <Route path="/super-admin/login" element={<SuperAdminLogin />} />
      </Route>
      <Route element={<SuperAdminLayout />}>
        <Route element={<SuperAdminRoutesGuard />}>
          <Route
            path="/super-admin/dashboard"
            element={<SuperAdminDashboard />}
          />
          <Route
            path="/election/:electionId"
            element={<ElectionDetailsForAdmin />}
          />
        </Route>
      </Route>
      <Route
        path="admin/candidates/:candidateId"
        element={<CandidateProfile />}
      />
      {/* Admin routes */}
      <Route element={<AuthGuard />}>
        <Route path="/admin/login" element={<AdminLogin />} />
      </Route>
      <Route element={<AdminRoutesGuard />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </HelmetProvider>
);
