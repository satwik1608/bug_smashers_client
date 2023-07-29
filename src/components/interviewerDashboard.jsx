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
  // interviewersList.map((data, rowIndex) => console.log(data.name, rowIndex));
  // console.log(timeSlots);
  console.log("grid", gridData);
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
            <tr key={rowIndex}>
              <td className="font-bold bg-gray-200 py-2 px-4">{data.name}</td>
              {timeSlots.map((timeSlot, colIndex) => (
                <>
                  {gridData[rowIndex][colIndex].data.available && (
                    <td
                      key={colIndex}
                      className="border border-gray-300 py-2 px-4 "
                      onClick={() => manageSchedule(rowIndex, colIndex)}
                    >
                      Available
                    </td>
                  )}
                  {gridData[rowIndex][colIndex].data.interview && (
                    <td
                      key={colIndex}
                      className="border border-gray-300 py-2 px-4 "
                      onClick={() => manageSchedule(rowIndex, colIndex)}
                    >
                      Interview
                    </td>
                  )}
                  {gridData[rowIndex][colIndex].data.block && (
                    <td
                      key={colIndex}
                      className="border border-gray-300 py-2 px-4 "
                      onClick={() => manageSchedule(rowIndex, colIndex)}
                    >
                      Block
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
