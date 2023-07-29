import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAllCandidate } from "../services/apiService";

function CandidateDashboard() {
  const [candidates, setCandidates] = useState();

  const canQuery = useQuery(["allcandidates"], async () => {
    const data = await getAllCandidate();
    return data.data;
  });

  useEffect(() => {
    if (canQuery.isSuccess) {
      setCandidates(canQuery.data);
    }
  }, [canQuery.data]);
  if (!candidates) {
    return <h1>Wait</h1>;
  }
  return (
    <div className="p-4">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 bg-gray-800 text-white">Name</th>
            <th className="border px-4 py-2 bg-blue-600 text-white">HR</th>
            <th className="border px-4 py-2 bg-green-600 text-white">TECH</th>
            <th className="border px-4 py-2 bg-purple-600 text-white">
              MANAGER
            </th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((data, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="border px-4 py-2">{data.name}</td>
              <td className="border px-4 py-2 text-center">
                {data.status.HR === 1 ? (
                  <span class="px-1 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                    {" "}
                    Qualified{" "}
                  </span>
                ) : data.status.HR === 2 ? (
                  <span class="px-2 py-1 font-semibold leading-tight text-blue-700 bg-gray-100 rounded-sm">
                    {" "}
                    In Process{" "}
                  </span>
                ) : (
                  <span class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                    {" "}
                    Rejected{" "}
                  </span>
                )}
              </td>

              <td className="border px-4 py-2 text-center">
                {data.status.TECH === 1 ? (
                  <span class="px-1 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                    {" "}
                    Qualified{" "}
                  </span>
                ) : data.status.TECH === 2 ? (
                  <span class="px-2 py-1 font-semibold leading-tight text-blue-700 bg-gray-100 rounded-sm">
                    {" "}
                    In Process{" "}
                  </span>
                ) : (
                  <span class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                    {" "}
                    Rejected{" "}
                  </span>
                )}
              </td>
              <td className="border px-4 py-2 text-center">
                {data.status.MANAGER === 1 ? (
                  <span class="px-1 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                    {" "}
                    Qualified{" "}
                  </span>
                ) : data.status.MANAGER === 2 ? (
                  <span class="px-2 py-1 font-semibold leading-tight text-blue-700 bg-gray-100 rounded-sm">
                    {" "}
                    In Process{" "}
                  </span>
                ) : (
                  <span class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                    {" "}
                    Rejected{" "}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CandidateDashboard;
