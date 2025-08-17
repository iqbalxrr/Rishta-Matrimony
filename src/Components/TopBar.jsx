import { FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";

const TopBar = () => {
  return (
    <div className="bg-[#4B2E2E] ">
      <div className="max-w-screen-xl   mx-auto text-white text-sm px-4 py-2 hidden md:flex justify-between items-center font-poppins">
        {/* Left Side: Contact Info */}
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1">
            <span className="text-lg">📞</span>
            <span>+01 7312 5312</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="text-lg">✉️</span>
            <span>help@rishta.com</span>
          </span>
        </div>

       
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-yellow-400 transition-colors duration-200">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-yellow-400 transition-colors duration-200">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-yellow-400 transition-colors duration-200">
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
