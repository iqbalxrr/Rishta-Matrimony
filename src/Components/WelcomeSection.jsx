import React from "react";
import { FaPhoneAlt, FaHeart, FaUsers, FaMale, FaFemale } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const WelcomeSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3, // adjust if needed
  });

  return (
    <div className="px-5 py-16">
      {/* Top Section */}
      <div className="max-w-screen-xl mx-auto lg:px-4 flex flex-col md:flex-row gap-10">
        {/* Image */}
        <div className="relative w-full md:w-1/2 hidden md:flex">
          <img
            src="/img1.png"
            alt="Couple 1"
            className="rounded-xl shadow-lg w-11/12 object-cover h-3/4"
          />
          <img
            src="/img2.png"
            alt="Couple 2"
            className="absolute bottom-[-20px] left-[30px] md:left-[50px] w-11/12 h-3/4 object-cover rounded-xl border-5 border-pink-200 shadow-xl"
          />
        </div>

        {/* Text */}
        <div className="w-full lg:w-1/2 text-start md:text-left">
          <h2 className="text-4xl font-bold text-[#66451C] mb-2 subtitle-font">WELCOME TO</h2>
          <h3 className="text-3xl text-rose-600 font-semibold mb-4 subtitle-font">
            WEDDING MATRIMONY
          </h3>
          <p className="text-gray-600 mb-3 poppins">
             Your journey to a happy and meaningful marriage begins here. In the world of endless possibilities, we make it easy for you to connect with genuine, compatible partners. Our platform is trusted, secure, and designed to make your wedding dreams come true.
             <br />
            <Link to="/loginpage">Start your matrimonial journey today  
              <span className="text-pink-600 font-medium underline cursor-pointer poppins mx-1">
                 click here
              </span>
            </Link>{" "}
            to begin!
          </p>
          <hr className="my-4" />
          <p className="text-gray-600 mb-4 poppins">
           While many websites may appear similar, we stand apart. Unlike generic content that lacks substance, our platform is built on trust, authenticity, and real success stories. Say goodbye to randomness and hello to a truly heartfelt experience.
          </p>

          {/* Contact */}
          <div className="flex gap-10 flex-col md:flex-row justify-center md:justify-start mt-6">
            <div className="flex items-center gap-2">
              <div className="bg-black text-white p-2 rounded-full">
                <FaPhoneAlt />
              </div>
              <span>+0123456789</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-black text-white p-2 rounded-full">
                <MdEmail />
              </div>
              <span>info@example.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div
        ref={ref}
        className="max-w-screen-xl mx-auto lg:px-4 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 mt-32 *:pt-6 *:h-[150px] *:md:h-[130px] text-center"
      >
        <div className="text-xl border md:border-l-0 p-6">
          <div className="flex items-center justify-center gap-2 font-semibold">
            <FaHeart className="text-pink-500" size={30} />
            <span className="subtitle-font text-2xl">
              {inView && <CountUp end={2000} duration={2} suffix="+" />}
            </span>
          </div>
          <p className="text-gray-600 mt-1">COUPLES PAIRED</p>
        </div>

        <div className="text-xl border md:border-l-0 p-6">
          <div className="flex items-center justify-center gap-2 font-semibold">
            <FaUsers className="text-yellow-600" size={30} />
            <span className="subtitle-font text-2xl">
              {inView && <CountUp end={4000} duration={2.5} suffix="+" />}
            </span>
          </div>
          <p className="text-gray-600 mt-1">REGISTERED</p>
        </div>

        <div className="text-xl border md:border-l-0 p-6">
          <div className="flex items-center justify-center gap-2 font-semibold">
            <FaMale className="text-blue-500" size={30} />
            <span className="subtitle-font text-2xl">
              {inView && <CountUp end={1600} duration={2} suffix="+" />}
            </span>
          </div>
          <p className="text-gray-600 mt-1">MEN</p>
        </div>

        <div className="text-xl border md:border-l-0 md:border-r-0 p-6">
          <div className="flex items-center justify-center gap-2 font-semibold">
            <FaFemale className="text-pink-400" size={30} />
            <span className="subtitle-font text-2xl">
              {inView && <CountUp end={2000} duration={2} suffix="+" />}
            </span>
          </div>
          <p className="text-gray-600 mt-1">WOMEN</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
