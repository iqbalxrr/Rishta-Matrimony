import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useDashboardStats } from "../../../Utils/Utils";
import Loader from "../../../Components/Loader";

const SuccessStories = () => {
  const { successStories, loading } = useDashboardStats();
  const [selectedStory, setSelectedStory] = useState(null);

  if (loading) return <Loader />;

  return (
    <div className="px-2 lg:px-8 py-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        Success Stories
      </h1>

      {successStories.length === 0 ? (
        <div className="text-gray-500 mt-10 text-center">
          No success stories found.
        </div>
      ) : (
        <>
          {/* Table for md and up */}
          <div className="hidden md:block overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-green-600 text-white">
                <tr className="text-center">
                  <th className="px-2 py-3 text-sm font-semibold">Male ID</th>
                  <th className="px-2 py-3 text-sm font-semibold">Female ID</th>
                  <th className="px-2 py-3 text-sm font-semibold">Marriage Date</th>
                  <th className="px-2 py-3 text-sm font-semibold">View Story</th>
                </tr>
              </thead>
              <tbody className="divide-y text-center divide-gray-200">
                {successStories.map((story) => (
                  <tr
                    key={story._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-2 py-3 text-sm">M-{story.selfId}</td>
                    <td className="px-2 py-3 text-sm">F-{story.partnerId}</td>
                    <td className="px-2 py-3 text-sm">
                      {new Date(story.marriageDate).toDateString()}
                    </td>
                    <td className="px-2 py-3 text-sm">
                      <button
                        onClick={() => setSelectedStory(story)}
                        className="text-blue-600 hover:underline text-xs"
                      >
                        View Story
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card layout for small devices */}
          <div className="md:hidden space-y-4">
            {successStories.map((story) => (
              <div key={story._id} className="bg-white shadow rounded-lg p-4">
                <p className="text-sm">
                  <span className="font-semibold">Male ID:</span> M-{story.selfId}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Female ID:</span> F-{story.partnerId}
                </p>
                <p className="text-sm mb-2">
                  <span className="font-semibold">Marriage Date:</span>{" "}
                  {new Date(story.marriageDate).toDateString()}
                </p>
                <button
                  onClick={() => setSelectedStory(story)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm"
                >
                  View Story
                </button>
              </div>
            ))}
          </div>
        </>
      )}

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
              className="w-full h-72 object-cover rounded-t-lg"
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
