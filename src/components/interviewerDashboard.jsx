import React from "react";

function InterviewerDashboard({
  timeSlots,
  interviewersList,
  gridData,
  manageSchedule,
}) {
  if (!interviewersList) {
    return <h1>Wait</h1>;
  }

  return (
    <div className="grid-container w-full overflow-x-auto flex-row justify-center">
      <table className="table-fixed w-full">
        <thead>
          <tr>
            <th className="w-24 py-2"></th>
            {timeSlots.map((timeSlot, index) => (
              <th key={index} className="w-24 py-2">
                {timeSlot}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {interviewersList.map((data, rowIndex) => (
            <tr key={data._id}>
              <td className="font-bold bg-gray-200 py-2 px-4">{data.name}</td>
              {timeSlots.map((timeSlot, colIndex) => (
                <>
                  {gridData[rowIndex][colIndex].data.available && (
                    <td
                      key={colIndex}
                      className="border border-gray-300 py-2 px-4 "
                      onClick={() => manageSchedule(rowIndex, colIndex)}
                    >
                      <span class="px-1 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                        {" "}
                        Available{" "}
                      </span>
                    </td>
                  )}
                  {gridData[rowIndex][colIndex].data.interview && (
                    <td
                      key={colIndex}
                      className="border border-gray-300 py-2 px-4 "
                    >
                      <span class="px-2 py-1 font-semibold leading-tight text-blue-700 bg-gray-100 rounded-sm">
                        {" "}
                        Interview{" "}
                      </span>
                    </td>
                  )}
                  {gridData[rowIndex][colIndex].data.block && (
                    <td
                      key={colIndex}
                      className="border border-gray-300 py-2 px-4 "
                    >
                      <span class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                        {" "}
                        Blocked{" "}
                      </span>
                    </td>
                  )}
                  {gridData[rowIndex][colIndex].data.interviewDone && (
                    <td
                      key={colIndex}
                      className="border border-gray-300 py-2 px-4 "
                    >
                      <span class="px-2 py-1 font-semibold leading-tight text-pink-700 bg-red-100 rounded-sm">
                        {" "}
                        Interviewed{" "}
                      </span>
                    </td>
                  )}
                </>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InterviewerDashboard;
