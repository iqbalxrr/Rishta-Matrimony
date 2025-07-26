
import React from "react";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../Axios Instance/axios";
import Loader from "./Loader2";
import { FaStar } from "react-icons/fa";

const SuccessStoryDetails = () => {
  const { storyId } = useParams();

  console.log(storyId)

  const { data: story, isLoading, isError } = useQuery({
    queryKey: ["successStory", storyId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/success-story/${storyId}`);
      return res.data;
    },
    enabled: !!storyId,
  });

  if (isLoading) return <Loader />;
  if (isError || !story)
    return (
      <div className="text-center text-red-500 p-10">
        Failed to load success story.
      </div>
    );

  return (
    <div className="min-h-screen bg-amber-50 pt-12 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 p-4 md:h-[100vh]">
        
        {/* Left: Image */}
        <div className="h-auto md:h-[100vh] md:sticky md:top-0 mt-12 md:mt-0 overflow-hidden rounded-xl">
          <img
            src={story.coupleImage}
            alt="Couple"
            className="w-full h-auto md:h-full object-cover rounded-xl"
          />
        </div>

        {/* Right: Content */}
        <div className="overflow-visible pt-6 pb-16 px-1 md:overflow-y-auto md:h-[100vh] md:pt-12 md:pr-3 hide-scrollbar">
          <h1 className="text-3xl subtitle-font font-bold text-[#7c4d0c] uppercase">
            {story.title}
          </h1>

          <p className="text-sm text-gray-600 mt-2">
            <strong>Marriage Date:</strong>{" "}
            {new Date(story.marriageDate).toDateString()}
          </p>

          <div className="flex items-center gap-1 mt-3">
            {[...Array(story.rating)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400" />
            ))}
          </div>

          {/* Full Story */}
          <div className="mt-6 text-gray-700 text-base leading-relaxed space-y-4">
            <p>{story.story}</p>
          </div>

          {/* Optional More Info */}
          <div className="mt-8 text-sm text-gray-600">
            <p><strong>Groom Name:</strong> {story.groomName}</p>
            <p><strong>Bride Name:</strong> {story.brideName}</p>
            <p><strong>Location:</strong> {story.location}</p>
          </div>

          {/* Back Button */}
          <div className="mt-10">
            <Link
              to="/blog"
              className="inline-block bg-[#4e2f1f] hover:bg-[#3c2515] text-white px-6 py-2 rounded-lg transition"
            >
              ← Back to Success Stories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoryDetails;
