import React, { useState } from "react";
import { useQuery } from "react-query";
import { useUser } from "../userContext";
import {
  acceptInvite,
  candidateVerdict,
  rejectInvite,
} from "../services/apiService";

function InterviewerHome() {
  const timeSlots = [
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
  ];
  const dummyData = [
    {
      startTime: 10,
    },
    {
      startTime: 11,
    },
  ];
  const { id: user, setId } = useUser();
  const [status, setStatus] = useState();
  const [availability, setAvailabilty] = useState();

  const statusQuery = useQuery(
    ["stat", user],
    () => {
      let temp = new Array(10).fill(0);
      let temp2 = new Array(10).fill(0);
      let aSlot = user.availableSlots;
      for (let i in aSlot) {
        temp[aSlot[i].start - 9] = 0;
      }
      let iSlot = user.interviewSlots;
      for (let i in iSlot) {
        temp[iSlot[i].timeSlot.start - 9] = 1;
        temp2[iSlot[i].timeSlot.start - 9] = 1;
      }
      let bSlot = user.blockedSlots;
      for (let i in bSlot) {
        temp[bSlot[i].start - 9] = 2;
      }
      setAvailabilty(temp2);
      setStatus(temp);
    },
    {
      enabled: !!user,
    }
  );

  const acceptInvitation = async (time) => {
    const obj = {
      email: user.email,
      timeSlot: {
        start: time + 9,
        end: time + 10,
      },
    };
    try {
      const data = await acceptInvite(obj);
      let temp = availability;
      temp[time] = 0;
      setId(data.data);
      setAvailabilty(temp);
    } catch {}
  };

  const rejectInvitation = async (time) => {
    const obj = {
      email: user.email,
      timeSlot: {
        start: time + 9,
        end: time + 10,
      },
    };
    try {
      const data = await rejectInvite(obj);
      let temp = availability;
      temp[time] = 0;
      setId(data.data);
      setAvailabilty(temp);
    } catch {}
  };

  const handleVerdict = async (verdict, time) => {
    const obj = {
      email: user.email,
      timeSlot: {
        start: time + 9,
        end: time + 10,
      },
      verdict: verdict,
    };
    try {
      const data = await candidateVerdict(obj);
      let temp = status[time];
      temp[time] = 0;

      setId(data.data);
      setStatus(temp);
    } catch {}
  };

  if (!user || !status) {
    return <div>Wait</div>;
  }

  return (
    <section class="container mx-auto p-6 font-mono">
      <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div class="w-full overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th class="px-4 py-3">Slots</th>
                <th class="px-4 py-3">Status</th>
                <th class="px-4 py-3">Verdict</th>
                <th class="px-4 py-3">Availability</th>
              </tr>
            </thead>
            <tbody class="bg-white">
              {timeSlots.map((time, index) => (
                <tr class="text-gray-700">
                  <td class="px-4 py-3 border">
                    <div class="flex items-center text-sm">
                      <div>
                        <p class="font-semibold text-black">{time}</p>
                        {/* <p class="text-xs text-gray-600">Developer</p> */}
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-ms font-semibold border">
                    <>
                      {status[index] === 0 && (
                        <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                          {" "}
                          Free{" "}
                        </span>
                      )}
                      {status[index] === 1 && (
                        <span class="px-2 py-1 font-semibold leading-tight text-orange-700 bg-gray-100 rounded-sm">
                          {" "}
                          Interview{" "}
                        </span>
                      )}
                      {status[index] === 2 && (
                        <span class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                          {" "}
                          Blocked{" "}
                        </span>
                      )}
                    </>
                  </td>
                  <td class="px-4 py-3 text-xs border">
                    {status[index] === 1 && (
                      <div class="flex ">
                        <div class="m-2">
                          <button
                            onClick={() => handleVerdict("pass", index)}
                            class="bg-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                          >
                            <span class="mr-2">Go</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentcolor"
                                d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
                              ></path>
                            </svg>
                          </button>
                        </div>

                        <div class="m-2">
                          <button
                            onClick={() => handleVerdict("fail", index)}
                            class="bg-white text-gray-800 font-bold rounded border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                          >
                            <span class="mr-2">No Go</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentcolor"
                                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                  <td class="px-4 py-3 text-sm border">
                    {status[index] === 1 && availability[index] === 1 && (
                      <div class="flex items-center justify-center">
                        <div class="m-3">
                          <button
                            onClick={() => acceptInvitation(index)}
                            class="bg-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                          >
                            <span class="mr-2">Available</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentcolor"
                                d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
                              ></path>
                            </svg>
                          </button>
                        </div>
                        <div class="m-3">
                          <button
                            onClick={() => rejectInvitation(index)}
                            class="bg-white text-gray-800 font-bold rounded border-b-2 border-yellow-500 hover:border-yellow-600 hover:bg-yellow-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                          >
                            <span class="mr-2">Not available</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentcolor"
                                d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default InterviewerHome;
