import React from "react";

function CandidateDashboard() {
  const peopleNames = [
    "John Doe",
    "Jane Smith",
    "Michael Johnson",
    "Emily Davis",
    "Robert Wilson",
    "Sarah Lee",
    "David Brown",
    "Olivia Miller",
    "William Taylor",
    "Ava Anderson",
    "James Thomas",
    "Sophia Garcia",
    "Alexander Martinez",
    "Isabella Robinson",
    "Ethan Clark",
    "Mia Hall",
    "Benjamin Allen",
    "Amelia Young",
    "Jacob Hernandez",
    "Evelyn Lopez",
  ];

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
          {peopleNames.map((name, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="border px-4 py-2">{name}</td>
              <td className="border px-4 py-2 text-center">-</td>
              <td className="border px-4 py-2 text-center">-</td>
              <td className="border px-4 py-2 text-center">-</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CandidateDashboard;
