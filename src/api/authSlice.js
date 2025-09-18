import { createSlice } from "@reduxjs/toolkit";

const getStoredAuth = () => {
  try {
    const voter = localStorage.getItem("voter");
    const voterToken = localStorage.getItem("voterToken");
    const admin = localStorage.getItem("admin");
    const superAdmin = localStorage.getItem("superAdmin");
    const candidate = localStorage.getItem("candidate");
    const candidateToken = localStorage.getItem("candidateToken");

    return {
      voter: voter ? JSON.parse(voter) : null,
      voterToken: voterToken || null,
      admin: admin ? JSON.parse(admin) : null,
      superAdmin: superAdmin ? JSON.parse(superAdmin) : null,
      candidate: candidate ? JSON.parse(candidate) : null,
      candidateToken: candidateToken || null,
    };
  } catch (error) {
    console.error("Error parsing stored auth:", error);
    return {
      voter: null,
      voterToken: null,
      admin: null,
      superAdmin: null,
      candidate: null,
      candidateToken: null,
    };
  }
};

const initialState = getStoredAuth();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setVoterCredentials: (state, action) => {
      const voterData = action.payload.voter || action.payload;
      state.voter = voterData;
      state.voterToken = voterData.token || action.payload.token || null;
      localStorage.setItem("voter", JSON.stringify(voterData));
      if (state.voterToken) {
        localStorage.setItem("voterToken", state.voterToken);
      }

      // Clear other roles/tokens
      state.admin = null;
      state.superAdmin = null;
      state.candidate = null;
      state.candidateToken = null;
      localStorage.removeItem("admin");
      localStorage.removeItem("superAdmin");
      localStorage.removeItem("candidate");
      localStorage.removeItem("candidateToken");
    },

    setCandidateCredentials: (state, action) => {
      const candidateData = action.payload.candidate || action.payload;
      state.candidate = candidateData;
      state.candidateToken =
        candidateData.candidateToken || action.payload.candidateToken || null;
      localStorage.setItem("candidate", JSON.stringify(candidateData));
      if (state.candidateToken) {
        localStorage.setItem("candidateToken", state.candidateToken);
      }

      // Clear other roles/tokens
      state.voter = null;
      state.voterToken = null;
      state.admin = null;
      state.superAdmin = null;
      localStorage.removeItem("voter");
      localStorage.removeItem("voterToken");
      localStorage.removeItem("admin");
      localStorage.removeItem("superAdmin");
    },

    setAdminCredentials: (state, action) => {
      const adminData = action.payload.admin || action.payload;
      state.admin = adminData;
      localStorage.setItem("admin", JSON.stringify(adminData));

      // Clear other roles/tokens
      state.voter = null;
      state.voterToken = null;
      state.superAdmin = null;
      state.candidate = null;
      state.candidateToken = null;
      localStorage.removeItem("voter");
      localStorage.removeItem("voterToken");
      localStorage.removeItem("superAdmin");
      localStorage.removeItem("candidate");
      localStorage.removeItem("candidateToken");
    },

    setSuperAdminCredentials: (state, action) => {
      const superAdminData = action.payload.superAdmin || action.payload;
      state.superAdmin = superAdminData;
      localStorage.setItem("superAdmin", JSON.stringify(superAdminData));

      // Clear other roles/tokens
      state.voter = null;
      state.voterToken = null;
      state.admin = null;
      state.candidate = null;
      state.candidateToken = null;
      localStorage.removeItem("voter");
      localStorage.removeItem("voterToken");
      localStorage.removeItem("admin");
      localStorage.removeItem("candidate");
      localStorage.removeItem("candidateToken");
    },

    // Generic logout - clears all roles/tokens
    logout: (state) => {
      state.voter = null;
      state.voterToken = null;
      state.admin = null;
      state.superAdmin = null;
      state.candidate = null;
      state.candidateToken = null;
      localStorage.removeItem("voter");
      localStorage.removeItem("voterToken");
      localStorage.removeItem("admin");
      localStorage.removeItem("superAdmin");
      localStorage.removeItem("candidate");
      localStorage.removeItem("candidateToken");
    },

    // Role-specific logout actions
    logoutVoter: (state) => {
      state.voter = null;
      state.voterToken = null;
      localStorage.removeItem("voter");
      localStorage.removeItem("voterToken");
    },

    logoutCandidate: (state) => {
      state.candidate = null;
      state.candidateToken = null;
      localStorage.removeItem("candidate");
      localStorage.removeItem("candidateToken");
    },

    logoutAdmin: (state) => {
      state.admin = null;
      localStorage.removeItem("admin");
    },

    logoutSuperAdmin: (state) => {
      state.superAdmin = null;
      localStorage.removeItem("superAdmin");
    },
  },
});

export const {
  setVoterCredentials,
  setAdminCredentials,
  setSuperAdminCredentials,
  setCandidateCredentials,
  logout,
  logoutVoter,
  logoutAdmin,
  logoutSuperAdmin,
  logoutCandidate,
} = authSlice.actions;

export default authSlice.reducer;
