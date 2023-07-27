import React from "react";

function InterviewerDashboard({
  timeSlots,
  peopleNames,
  gridData,
  manageSchedule,
}) {
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
          {peopleNames.map((name, rowIndex) => (
            <tr key={rowIndex}>
              <td className="font-bold bg-gray-200 py-2 px-4">{name}</td>
              {timeSlots.map((timeSlot, colIndex) => (
                <td
                  key={colIndex}
                  className="border border-gray-300 py-2 px-4"
                  onClick={() => manageSchedule(rowIndex, colIndex)}
                >
                  {gridData[rowIndex][colIndex].data}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InterviewerDashboard;
