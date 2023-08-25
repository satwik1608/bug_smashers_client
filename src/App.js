import React from "react";
import Home from "./components/home";
import AdminHome from "./components/adminHome";
import ScheduleInterview from "./components/scheduleInterview";
import { Route, Routes, Redirect } from "react-router-dom";
import CandidateDashboard from "./components/candidateDashboard";
import RequireAuth from "./components/common/requireAuth";
import { UserProvider } from "./userContext";
import InterviewerHome from "./components/interviewerHome";
import InterviewerForm from "./components/interviewerForm";
function App() {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route path="/interviewerHome" element={<InterviewerHome />} />
          <Route path="/adminHome" element={<AdminHome />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<InterviewerForm />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
