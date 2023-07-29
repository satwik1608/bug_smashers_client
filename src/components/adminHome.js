import React, { useState, useRef, useEffect } from "react";
import ScheduleInterview from "./scheduleInterview";
import { Link } from "react-router-dom";
import InterviewerDashboard from "./interviewerDashboard";
import { getAllInterviewer, smarty } from "../services/apiService";
import CandidateDashboard from "./candidateDashboard";
import { useQuery } from "react-query";
function AdminHome() {
  const [open, setOpen] = useState(false);
  const [candidateDash, setCandidateDash] = useState(false);
  const [row, setRow] = useState();
  const [col, setCol] = useState();
  const [interviewers, setInterviewers] = useState();
  const [grid, setGrid] = useState();
  const [upd, setUpd] = useState(0);

  const cancelButtonRef = useRef(null);

  const manageSchedule = (row, col) => {
    setRow(row);
    setCol(col);
    setOpen((open) => !open);
  };

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
  ];

  const interQuery = useQuery(["interviewerDashboard", open, upd], async () => {
    const data = await getAllInterviewer();
    return data.data;
  });

  const magic = async () => {
    const obj = {
      currentTime: 9,
    };
    const data = await smarty(obj);
    console.log("God", data.data);
    setUpd((upd) => 1 - upd);
  };

  useEffect(() => {
    if (interQuery.isSuccess) {
      setInterviewers(interQuery.data);
      let tempGrid = interQuery.data.map((person) => {
        return timeSlots.map((timeSlot) => ({
          timeSlot,
          data: {
            available: false,
            interview: false,
            block: false,
          }, // Add any data for each cell if needed
        }));
      });

      interQuery.data.map((person, rowIndex) => {
        let aslots = person.availableSlots;
        for (let i in aslots) {
          tempGrid[rowIndex][aslots[i].start - 9].data.available = true;
        }
        let bslots = person.blockedSlots;
        for (let i in bslots) {
          tempGrid[rowIndex][bslots[i].start - 9].data.block = true;
        }
        let islots = person.interviewSlots;
        for (let i in islots) {
          tempGrid[rowIndex][
            islots[i].timeSlot.start - 9
          ].data.interview = true;
        }
      });
      setGrid(tempGrid);

      console.log(interQuery.data);
    }
  }, [interQuery.data]);

  if (interviewers) {
    return (
      <>
        <InterviewerDashboard
          timeSlots={timeSlots}
          interviewersList={interviewers}
          manageSchedule={manageSchedule}
          gridData={grid}
        />
        <div className="flex justify-center">
          <button
            type="button"
            class="mr-5 mt-10 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            Upload CSV
          </button>
          <button
            type="button"
            onClick={magic}
            class="ml-5 mt-10 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
          >
            Smart Schedule
          </button>
          <button
            type="button"
            onClick={() => setCandidateDash((c) => !c)}
            class="ml-5 mt-10 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Student Dashboard
          </button>
        </div>
        {open && (
          <ScheduleInterview
            open={open}
            setOpen={setOpen}
            cancelButtonRef={cancelButtonRef}
            row={row}
            col={col}
            interviewer={interviewers[row]}
          />
        )}
        {candidateDash && <CandidateDashboard />}
      </>
    );
  }

  return <h1>Wait</h1>;
}

export default AdminHome;
