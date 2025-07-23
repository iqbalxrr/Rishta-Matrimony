
import React from "react";

const AboutPage = () => {
  return (
    <section className="bg-[#fffdf7] py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">About Us</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          At <span className="font-semibold text-pink-600">Rishta</span>, we believe in
          connecting hearts and building lasting relationships. Our platform is designed
          to help individuals find their perfect life partners based on shared values,
          culture, and trust. Whether you're seeking companionship, love, or marriage,
          we're here to guide you every step of the way.
        </p>
        <p className="mt-4 text-lg text-gray-600">
          We value authenticity, privacy, and respect — ensuring a safe and meaningful
          experience for everyone. Start your journey with us and find your ideal match
          today!
        </p>
      </div>
    </section>
  );
};

export default AboutPage;
