import React from "react";
import Home from "./components/home";
import AdminHome from "./components/adminHome";
import ScheduleInterview from "./components/scheduleInterview";
import { Route, Routes, Redirect } from "react-router-dom";
import CandidateDashboard from "./components/candidateDashboard";
import InterviewerHome from "./components/interviewerHome";
function App() {
  return (
    <>
      <InterviewerHome />
    </>
  );
}

export default App;
