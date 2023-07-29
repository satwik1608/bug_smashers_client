import React, { useState } from "react";
import { useQuery } from "react-query";
import { useUser } from "../userContext";
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
  console.log(user);
  if (!user) {
    return <div>Wait</div>;
  }
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">{user.name}</h2>
      <div className="grid grid-cols-2">
        <div className="overflow-x-auto  ">
          <table className="w-96 table-auto border-collapse">
            <thead>
              <tr>
                <th className="w-16 px-4 py-3 bg-gray-800 text-white">Time</th>
                <th className="px-4 py-3 bg-gray-800 text-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="border px-4 py-2 w-16">{time}</td>
                  <td className="border px-4 py-2">
                    <button class="bg-red-500 ml-5 hover:bg-red-700 text-white font-bold py-2 px-2 border border-red-700 rounded">
                      Block
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-3 bg-gray-800 text-white">Requests</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((data, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="border px-4 py-2">
                    <div className="flex ">
                      {data.startTime}
                      <button class="bg-green-500 ml-5 mr-5 hover:bg-green-700 text-white font-bold py-2 px-2 border border-green-700 rounded">
                        Accept
                      </button>
                      <button class="bg-red-500 ml-5 hover:bg-red-700 text-white font-bold py-2 px-2 border border-red-700 rounded">
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default InterviewerHome;
