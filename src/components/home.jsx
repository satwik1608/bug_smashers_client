import React, { useState } from "react";
import AdminLogin from "./common/adminLogin";
import InterviewerLogin from "./common/interviewerLogin";

function Home() {
  const [admin, setAdmin] = useState(false);
  const [interviewer, setInterviewer] = useState(false);

  const configInterviewer = () => {
    if (admin) setAdmin((admin) => !admin);
    setInterviewer((interviewer) => !interviewer);
  };
  const configAdmin = () => {
    if (interviewer) setInterviewer((interviewer) => !interviewer);
    setAdmin((admin) => !admin);
  };
  return (
    <>
      <div class="min-h-screen flex items-center justify-center">
        <div class="flex gap-4">
          <button
            onClick={configAdmin}
            class="relative flex  h-[50px] w-60 items-center justify-center overflow-hidden bg-gray-800 text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-orange-600 before:duration-500 before:ease-out hover:shadow-orange-600 hover:before:h-56 hover:before:w-56 disabled"
          >
            <span class="relative z-10">Admin</span>
          </button>
          {admin && <AdminLogin />}
          {interviewer && <InterviewerLogin />}
          <button
            onClick={configInterviewer}
            class="relative flex  h-[50px]   w-60 items-center justify-center overflow-hidden bg-gray-800 text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-orange-600 before:duration-500 before:ease-out hover:shadow-orange-600 hover:before:h-56 hover:before:w-56"
          >
            <span class="relative z-10">Interviewer</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
