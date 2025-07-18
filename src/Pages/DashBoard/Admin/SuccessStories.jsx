
import React from "react";

const successStories = [
  {
    id: 1,
    maleBiodataId: "M-101",
    femaleBiodataId: "F-201",
  },
  {
    id: 2,
    maleBiodataId: "M-102",
    femaleBiodataId: "F-202",
  },
  {
    id: 3,
    maleBiodataId: "M-103",
    femaleBiodataId: "F-203",
  },
];

const SuccessStories = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Success Stories</h1>

      <table className="w-full border-collapse shadow-md rounded overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-6 text-left">Male Biodata ID</th>
            <th className="py-3 px-6 text-left">Female Biodata ID</th>
            <th className="py-3 px-6 text-left">View Story</th>
          </tr>
        </thead>
        <tbody>
          {successStories.map(({ id, maleBiodataId, femaleBiodataId }) => (
            <tr
              key={id}
              className="border-b hover:bg-gray-100 cursor-pointer"
            >
              <td className="py-3 px-6">{maleBiodataId}</td>
              <td className="py-3 px-6">{femaleBiodataId}</td>
              <td className="py-3 px-6">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => alert(`Viewing story for IDs ${maleBiodataId} & ${femaleBiodataId}`)}
                >
                  View Story
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuccessStories;
