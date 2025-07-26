
import React from 'react';
import { FaStar } from 'react-icons/fa';
import { useDashboardStats } from '../Utils/Utils';

import { Link } from 'react-router';
import Loader from './Loader2';

const SuccessStoryBlog = () => {
    const { successStories, loading } = useDashboardStats();

    if (loading) return <Loader />;

    const sortedStories = [...successStories].sort(
        (a, b) => new Date(b.marriageDate) - new Date(a.marriageDate)
    );

    return (
        <section className=" max-w-screen-xl  mx-auto min-h-screen   py-32 px-4 ">
            <div className="">
                <div className="text-center mb-12">
                    <h4 className="text-[#b98c5e] text-sm font-bold uppercase tracking-wide mb-2">Success Stories</h4>
                    <h2 className="text-4xl font-extrabold text-gray-800 subtitle-font font-serif">Real Love Stories</h2>
                    <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                        Discover inspiring journeys of couples who found their life partners through our platform.
                    </p>
                    <img src="/flower.png" alt="flower" className="w-40 mx-auto mt-4" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {sortedStories.map((story) => (
                        <div
                            key={story._id}
                            className="bg-white rounded-2xl shadow hover:shadow-lg overflow-hidden transition-all duration-300"
                        >
                            <img
                                src={story.coupleImage}
                                alt="Couple"
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm text-pink-700 font-medium">
                                        {new Date(story.marriageDate).toDateString()}
                                    </p>
                                    <div className="flex items-center">
                                        {Array.from({ length: story.rating }).map((_, i) => (
                                            <FaStar key={i} className="text-yellow-400 text-sm" />
                                        ))}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{story.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 mb-4">
                                    {story.story}
                                </p>
            
                                <Link to={`/success-story/${story._id}`}>
                                    <button className="bg-[#4e2f1f] text-white text-sm px-5 py-2 rounded hover:bg-[#3a2115] transition"
                                    >Read Full Story</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SuccessStoryBlog;
