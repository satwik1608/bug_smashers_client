import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useQuery } from "react-query";
import { getAllCandidate, schedule } from "../services/apiService";

export default function ScheduleInterview({
  open,
  setOpen,
  cancelButtonRef,
  row,
  col,
  interviewer,
}) {
  // Sample local array of students
  const [candidates, setCandidates] = useState();

  const candidateQuery = useQuery(["candidates"], async () => {
    const data = await getAllCandidate(interviewer.type, true);
    return data.data;
  });

  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleSchedule = async () => {
    if (!selectedStudent) {
      return;
    }
    const obj = {
      email: interviewer.email,
      timeSlot: {
        start: col + 9,
        end: col + 10,
      },
      candidateId: selectedStudent._id,
    };
    try {
      await schedule(obj);
      setOpen(false);
    } catch {}
  };

  useEffect(() => {
    if (candidateQuery.isSuccess) {
      console.log(candidateQuery.data);
      setCandidates(candidateQuery.data);
    }
  }, [candidateQuery.data]);

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
  };
  if (!candidates) {
    return <h1>Wait</h1>;
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="p-4 border rounded-lg shadow-lg bg-white">
                  <div className="mb-4">
                    <p className="font-bold text-xl mb-2">Time Slot:</p>
                    <p className="font-semibold">
                      {col + 9} - {col + 10}
                    </p>
                  </div>

                  <button
                    className={`px-4 py-2 rounded ${
                      selectedStudent
                        ? "bg-red-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    } hover:bg-red-600 transition-colors duration-300`}
                    onClick={() => handleStudentSelect(null)}
                  >
                    {selectedStudent
                      ? `${selectedStudent.name}`
                      : "No Student Selected"}
                  </button>
                  <button
                    type="button"
                    onClick={handleSchedule}
                    class="text-white ml-5 bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Schedule Interview
                  </button>

                  <div className="mt-4">
                    <p className="font-bold text-xl mb-2">Select a Student:</p>
                    {candidates.map((student) => (
                      <button
                        key={student._id}
                        className={`w-full text-left mt-2 p-2 rounded ${
                          selectedStudent === student
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-700"
                        } hover:bg-blue-500 hover:text-white transition-colors duration-300`}
                        onClick={() => handleStudentSelect(student)}
                      >
                        {student.name}
                      </button>
                    ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
