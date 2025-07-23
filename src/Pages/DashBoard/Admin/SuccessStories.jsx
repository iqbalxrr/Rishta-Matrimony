import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDashboardStats } from "../../../Utils/Utils";

const SuccessStories = () => {
  const { successStories, loading } = useDashboardStats();
  const [selectedStory, setSelectedStory] = useState(null);

  if (loading) return <p className="py-10 text-center">Loading...</p>;

  return (
    <div className="relative px-2 sm:px-4 lg:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">Success Stories</h1>

      <div className="overflow-x-auto rounded shadow-md">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 sm:px-6">Male Biodata ID</th>
              <th className="py-3 px-4 sm:px-6">Female Biodata ID</th>
              <th className="py-3 px-4 sm:px-6">Marriage Date</th>
              <th className="py-3 px-4 sm:px-6">View Story</th>
            </tr>
          </thead>
          <tbody>
            {successStories.map((story) => (
              <tr
                key={story._id}
                className="border-b hover:bg-gray-100 cursor-pointer"
              >
                <td className="py-3 px-4 sm:px-6">M-{story.selfId}</td>
                <td className="py-3 px-4 sm:px-6">F-{story.partnerId}</td>
                <td className="py-3 px-4 sm:px-6">
                  {new Date(story.marriageDate).toDateString()}
                </td>
                <td className="py-3 px-4 sm:px-6">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => setSelectedStory(story)}
                  >
                    View Story
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg w-11/12 sm:w-full max-w-xl mx-auto shadow-xl relative overflow-y-auto max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-2 right-3 text-red-600 text-3xl font-bold"
            >
              &times;
            </button>

            {/* Image */}
            <img
              src={selectedStory.coupleImage}
              alt="Couple"
              className="w-full h-72 sm:h-72 object-cover rounded-t-lg"
            />

            {/* Content */}
            <div className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                {selectedStory.title}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Male Biodata ID:</span> M-{selectedStory.selfId}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Female Biodata ID:</span> F-{selectedStory.partnerId}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-semibold">Marriage Date:</span>{" "}
                {new Date(selectedStory.marriageDate).toDateString()}
              </p>
              <div className="flex items-center mb-3">
                {Array.from({ length: selectedStory.rating }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-500 mr-1" />
                ))}
              </div>
              <p className="text-gray-700 text-sm sm:text-base">{selectedStory.story}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessStories;
