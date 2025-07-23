import React from 'react';
import { FaStar } from 'react-icons/fa';
import { useDashboardStats } from '../Utils/Utils';
import Loader from './Loader';


const SuccessStory = () => {
  const { successStories, loading } = useDashboardStats();

  if (loading) return <p className="text-center py-10"><Loader></Loader></p>;

  const sortedStories = [...successStories].sort(
    (a, b) => new Date(b.marriageDate) - new Date(a.marriageDate)
  );

  return (
    <div className="py-32 px-4 max-w-screen-xl mx-auto lg:px-4">
      <h4 className="text-lg text-[#b98c5e] font-semibold text-center subtitle-font uppercase tracking-wider">
        Success Story
      </h4>
      <h2 className="text-center text-3xl px-2 sm:text-4xl font-bold subtitle-font text-[#4e2f1f] mt-2 font-serif">
        Blog & Articles
      </h2>
      <img src="/flower.png" alt="decoration" className="w-52 mx-auto mb-16 mt-4" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {sortedStories.slice(0 , 3).map((story) => (
          <div
            key={story._id}
            className="overflow-hidden transition duration-300"
          >
            <img
              src={story.coupleImage}
              alt="Couple"
              className="w-full h-64 object-cover"
            />
            <div className="pt-5">
              <p className="text-sm text-pink-700 font-semibold uppercase mb-1">
                {new Date(story.marriageDate).toDateString()}
              </p>
              <h3 className="text-xl font-semibold text-[#4e2f1f] mb-2 subtitle-font">
                {story.title}
              </h3>
              <div className="flex items-center mb-2">
                {Array.from({ length: story.rating }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-500 mr-1" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                {story.story}
              </p>
              <button className="bg-black text-white text-xs px-4 py-2 uppercase font-semibold tracking-wide hover:bg-gray-800">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStory;
