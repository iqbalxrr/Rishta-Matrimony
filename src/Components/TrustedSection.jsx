import React from 'react';
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonials = [
  {
    name: 'JACK DANIAL',
    location: 'New York',
    image: 'https://i.ibb.co/0f4rY3j/user1.jpg',
    text: 'We found our perfect match within a few weeks. The platform is truly made for serious relationships!',
  },
  {
    name: 'SOPHIA RICHARDS',
    location: 'California',
    image: 'https://i.ibb.co/4dTxVKm/user2.jpg',
    text: 'I loved how easy it was to navigate and connect with genuine profiles. Thank you for helping me find love!',
  },
  {
    name: 'MAYA THOMSON',
    location: 'Texas',
    image: 'https://i.ibb.co/SxB0RJ2/user3.jpg',
    text: 'I never thought I’d meet someone online, but this matrimony site changed my life. Highly recommended!',
  },
  {
    name: 'RAHUL VERMA',
    location: 'New Jersey',
    image: '/img1.png',
    text: 'Very professional and secure platform. The verification process gave me a lot of confidence.',
  },
];

// Custom Arrows
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 z-10 transform -translate-y-1/2 bg-[#ffb86c] text-white p-3 rounded-full shadow-md hover:bg-[#e0a84a] transition-colors duration-300 sm:-left-3 sm:p-2"
    aria-label="Previous Slide"
  >
    <FaChevronLeft />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 z-10 transform -translate-y-1/2 bg-[#ffb86c] text-white p-3 rounded-full shadow-md hover:bg-[#e0a84a] transition-colors duration-300 sm:-right-3 sm:p-2"
    aria-label="Next Slide"
  >
    <FaChevronRight />
  </button>
);

const TrustedSection = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,         
    autoplaySpeed: 3000,     
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="py-16 mt-12">
      <div className="text-center mb-10 px-4 sm:px-6 lg:px-8">
        <h4 className="text-lg text-[#b98c5e] tracking-widest subtitle-font font-semibold">TRUSTED BRAND</h4>
        <h2 className="text-3xl sm:text-4xl font-bold subtitle-font  text-[#4e2f1f] mt-2">
          Trust by <span className="text-5xl font-extrabold">2500+</span> Couples
        </h2>
        <div className="flex justify-center mt-4">
          <img src="/flower.png" alt="decor" className="w-52" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <Slider {...settings}>
          {testimonials.map((item, idx) => (
            <div key={idx} className="px-3">
              <div className="bg-white rounded-xl border border-gray-200 p-6 text-center h-[300px] md:h-[280px] relative">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Colored corners */}
                  <div className="absolute w-2 h-2 bg-red-400 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm" />
                  <div className="absolute w-2 h-2 bg-yellow-400 bottom-0 left-0 -translate-x-1/2 translate-y-1/2 rounded-sm" />
                  <div className="absolute w-2 h-2 bg-blue-400 top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-sm" />
                  <div className="absolute w-2 h-2 bg-purple-400 bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 rounded-sm" />
                </div>
                <p className="text-gray-600 text-sm mb-4">{item.text}</p>
                <h3 className="text-[#4e2f1f] font-semibold">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.location}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TrustedSection;
