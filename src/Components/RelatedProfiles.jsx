import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../Axios Instance/axios";

// Custom arrow components for the slider
const PrevArrow = (props) => (
  <div
    className="absolute left-[-15px] top-[40%] z-10 bg-[#E0A84A] text-white shadow p-2 rounded-full cursor-pointer"
    onClick={props.onClick}
  >
    <FaChevronLeft />
  </div>
);

const NextArrow = (props) => (
  <div
    className="absolute right-[-15px] top-[40%] z-10 bg-[#E0A84A] text-white shadow p-2 rounded-full cursor-pointer"
    onClick={props.onClick}
  >
    <FaChevronRight />
  </div>
);

const RelatedProfiles = () => {
  const { data: profiles = [], isLoading, isError } = useQuery({
    queryKey: ['relateds'],
    queryFn: async () => {
      const res = await axiosInstance.get('/biodatas');
      return res.data;
    },
  });

  console.log(profiles)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center py-10 text-red-600">Failed to load profiles</div>;
  }

  return (
    <div className="mt-2">
      <div className="relative md:px-4">
        <Slider {...settings}>
          {profiles.map((profile, idx) => (
            <div key={idx} className="px-2">
              <div className="rounded-xl overflow-hidden shadow-md relative bg-white">
                <img
                  src={profile.profileImage}
                  alt={profile.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-2 left-2 bg-white text-sm text-black px-2 py-1 rounded">
                  {profile.age} Years old
                </div>
                <div className="bg-white py-3 text-center shadow mt-[-20px] relative z-10 mx-4 rounded-lg">
                  <p className="font-semibold text-orange-800 text-base lowercase">{profile.name}</p>
                  <p className="text-sm text-gray-600 uppercase">
                    City: {profile.presentDivision}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default RelatedProfiles;
