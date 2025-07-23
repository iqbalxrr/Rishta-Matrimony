
import React from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDashboardStats } from "../Utils/Utils";

const RecentCouplesSlider = () => {

const {successStories} = useDashboardStats();

  
  const NextArrow = (props) => (
    <div
      className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 rounded-full p-2 cursor-pointer text-white"
      onClick={props.onClick}
    >
      <FaArrowRight />
    </div>
  );

  const PrevArrow = (props) => (
    <div
      className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 rounded-full p-2 cursor-pointer text-white"
      onClick={props.onClick}
    >
      <FaArrowLeft />
    </div>
  );

  const settings = {
     infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  speed: 800,
  autoplay: true,               
  autoplaySpeed: 2000,       
  cssEase: "ease-in-out",      
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="py-32 ">
       <h4 className="text-lg text-[#b98c5e] tracking-widest subtitle-font font-semibold text-center ">collections</h4>
      <h2 className="text-center text-3xl sm:text-4xl font-bold subtitle-font  text-[#4e2f1f] mt-2 ">Photo gallery</h2>
      <img src="/flower.png" alt="" className="w-50 mx-auto mb-16" />
      <div className="relative px-4 ">
        <Slider {...settings}>
          {successStories.map((couple) => (
            <div key={couple.id} className="px-2">
              <img
                src={couple.coupleImage}
                alt={`Couple ${couple._id}`}
                className="w-full h-[550px] object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default RecentCouplesSlider;
