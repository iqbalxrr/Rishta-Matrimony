
import React from 'react';
import { FaFacebook, FaTwitter, FaGithub, FaDiscord, FaDribbble } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-rose-800 pt-24 pb-5 text-white">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="#" className="flex items-center">
              <img
                src="/logo.png"
                className=" w-30 invert brightness-0"
                alt="Logo"
              />
              
            </a>
            <p className='w-3/4'>Rishta – A trusted matrimony platform helping you find your perfect life partner with ease, safety, and sincerity.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Resources</h2>
              <ul className="text-white font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">Flowbite</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Tailwind CSS</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Follow us</h2>
              <ul className="text-white font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">Github</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Discord</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Legal</h2>
              <ul className="text-white font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Terms & Conditions</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-400 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-white sm:text-center">
            © 2025 <a href="#" className="hover:underline">Rishta™</a>. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-5 text-xl">
            <a href="#" className="text-white "><FaFacebook /></a>
            <a href="#" className="text-white "><FaDiscord /></a>
            <a href="#" className="text-white"><FaTwitter /></a>
            <a href="#" className="text-white"><FaGithub /></a>
            <a href="#" className="text-white"><FaDribbble /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
