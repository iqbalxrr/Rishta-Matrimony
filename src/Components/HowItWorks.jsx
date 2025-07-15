
import React from "react";

const steps = [
  {
    title: "Register",
    description: "Create an account with your basic information to get started.",
    image: "/rings.png",
    position: "right",
  },
  {
    title: "Find your Match",
    description: "Browse profiles and find someone who matches your preferences.",
    image: "/wedding-2.png",
    position: "left",
  },
  {
    title: "Send Interest",
    description: "Show interest to someone you like by sending a request.",
    image: "/love-birds.png",
    position: "right",
  },
  {
    title: "Get Profile Information",
    description: "Access detailed information about profiles you're interested in.",
    image: "/network.png",
    position: "left",
  },
  {
    title: "Start Meetups",
    description: "Communicate and schedule meetings to get to know each other.",
    image: "/chat.png",
    position: "right",
  },
  {
    title: "Getting Marriage",
    description: "When everything aligns, plan your special day together.",
    image: "/wedding-couple.png",
    position: "left",
  },
];

const HowItWorks = () => {
  return (
    <div className="py-16 ">
       <h4 className="text-lg text-[#b98c5e] tracking-widest subtitle-font font-semibold text-center ">moments</h4>
      <h2 className="text-center text-3xl sm:text-4xl font-bold subtitle-font  text-[#4e2f1f] mt-2 ">How it works</h2>
      <img src="/flower.png" alt="" className="w-50 mx-auto mb-16" />
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-rose-600" />
        {steps.map((step, index) => (
          <div
            key={index}
            className={`mb-10 flex items-center justify-between w-full ${
              step.position === "right" ? "flex-row-reverse" : ""
            }`}
          >
            <div className="w-1/2 px-4">
              <div className="bg-blue-50 p-3 md:p-6 rounded-lg shadow-md">
                <h3 className="text-[14px] md:text-xl subtitle-font font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-[12px] md:text-base  poppins">{step.description}</p>
              </div>
            </div>
            <div className="relative z-10 w-8 h-8 bg-rose-600 border-4 border-white rounded-full shadow-md" />
            <div className="w-1/2 flex justify-center px-4">
              <img src={step.image} alt={step.title} className="w-20 md:w-30 " />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
