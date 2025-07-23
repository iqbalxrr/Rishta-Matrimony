import React from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const services = [
  {
    title: "Photo Gellary",
    sub: "1200+ Profiles",
    image: "/img1.png",
    icon: "/photo-camera.png",
  },
  {
    title: "Browse Profiles",
    sub: "1200+ Profiles",
    image: "/img2.png",
    icon: "/user.png",
  },
  {
    title: "Wedding",
    sub: "1200+ Profiles",
    image: "/img3.png",
    icon: "/gate.png",
  },
  {
    title: "All Services",
    sub: "1200+ Profiles",
    image: "/img4.png",
    icon: "/hall.png",
  },
  {
    title: "Join Now",
    sub: "Start for free",
    image: "/img5.png",
    icon: "/couple.png",
  },
];

const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="arrow next text-white text-xl absolute top-1/2 right-4 z-20 transform -translate-y-1/2 cursor-pointer"
  >
    <FaArrowRight color="#C70036" />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="arrow prev text-white text-xl absolute top-1/2 left-4 z-20 transform -translate-y-1/2 cursor-pointer"
  >
    <FaArrowLeft color="#C70036" />
  </div>
);

const OurServices = () => {
  const settings = {
    infinite: true,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 2000,
    centerPadding: "40px",
    slidesToShow: 3,
    speed: 500,
    dots: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 2560,
        settings: {
          slidesToShow: 5,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 1480,
        settings: {
          slidesToShow: 5,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 2,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
          centerPadding: "0px",
        },
      },
    ],
  };

  return (
    <div className="bg-black py-16 text-white">
      <h2 className="text-center  subtitle-font text-[#C48C46] ">Quick Access</h2>
      <h1 className="text-center text-3xl sm:text-4xl  font-bold subtitle-font text-[#C48C46] ">Our Services</h1>
      <img src="/flower.png" alt="" className="w-50 mx-auto mb-16" />

      <div className="relative px-2 sm:px-4 md:px-10">
        <div className="pb-8">
          <Slider {...settings}>
            {services.map((item, i) => (
              <div key={i} className="px-2">
                <div className="rounded-xl h-[320px] bg-center relative group overflow-hidden">
                  {/* Background Image with Zoom on Hover */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>

                
                  <div className="absolute inset-0 bg-black/50  rounded-xl transition-all duration-300 z-0"></div> 

                  {/* Content */}
                  <div className="flex flex-col justify-center items-center p-6 text-center h-full relative z-10 transition-opacity duration-300 group-hover:opacity-0">
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-20 mb-6 filter invert border-2 border-black rounded-3xl p-4"
                    />
                    <h3 className="text-2xl subtitle-font font-bold">{item.title}</h3>
                    <p className="text-sm text-gray-300">{item.sub}</p>
                  </div>

                  {/* Button */}
                
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
