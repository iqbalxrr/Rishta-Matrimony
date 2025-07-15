import React from 'react';
import { FaStar } from 'react-icons/fa';

const stories = [
  {
    id: 1,
    title: 'Perfect Match',
    coupleImage: '/img4.png',
    marriageDate: '2024-12-15',
    rating: 5,
    story: 'We met through Rishta and it was a perfect match. From our very first conversation, we felt a special connection. Our families instantly clicked, and we celebrated a beautiful wedding in December 2024!',
  },
  {
    id: 2,
    title: 'Found Love',
    coupleImage: '/img3.png',
    marriageDate: '2023-08-20',
    rating: 4,
    story: 'Finding love felt easy with Rishta. I met someone who truly understood me, and every step of our journey felt natural and joyful. We tied the knot in August 2023, and we’re grateful for the platform.',
  },
  {
    id: 3,
    title: 'Online Bond',
    coupleImage: '/img5.png',
    marriageDate: '2022-05-10',
    rating: 4,
    story: 'Love found us when we least expected it. From a simple hello on Rishta to a lifetime of togetherness—our story began online and blossomed into a beautiful marriage in May 2022.',
  }
]

const sortedStories = [...stories].sort(
  (a, b) => new Date(b.marriageDate) - new Date(a.marriageDate)
);

const SuccessStory = () => {
  return (
    <div className="py-32 px-4  max-w-screen-xl mx-auto lg:px-4 ">
      <h4 className="text-lg text-[#b98c5e] font-semibold text-center subtitle-font uppercase tracking-wider">
        Success Story
      </h4>
      <h2 className="text-center text-3xl px-2 sm:text-4xl font-bold subtitle-font  text-[#4e2f1f] mt-2 font-serif">
        Blog & Articles
      </h2>
      <img src="/flower.png" alt="decoration" className="w-52 mx-auto mb-16 mt-4" />

      <div className="grid grid-cols-1  lg:grid-cols-3 gap-10">
        {sortedStories.map((story) => (
          <div
            key={story.id}
            className=" overflow-hidden transition duration-300 "
          >
            <img
              src={story.coupleImage}
              alt="Couple"
              className="w-full h-64 object-cover"
            />
            <div className="pt-5">
              <p className="text-sm text-pink-700 font-semibold uppercase mb-1">
                {story.marriageDate}
              </p>
              <h3 className="text-xl font-semibold text-[#4e2f1f] mb-2 subtitle-font ">
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
