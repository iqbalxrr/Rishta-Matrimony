
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart, FaEnvelope, FaPhone } from "react-icons/fa";

// Dummy user context
const useAuth = () => {
  return {
    user: { role: "normal" }, // change to "premium" to test
  };
};

const dummyBiodata = {
  id: 1,
  name: "Hasan Mahmud",
  gender: "Male",
  age: 28,
  height: "5'9\"",
  profession: "Software Engineer",
  education: "BSc in CSE",
  religion: "Islam",
  division: "Dhaka",
  image: "https://i.ibb.co/album-profile.jpg",
  email: "hasan@example.com",
  phone: "01700000000",
};

const similarBiodatas = [
  {
    id: 2,
    name: "Rafiul Islam",
    gender: "Male",
    age: 30,
    profession: "Doctor",
    division: "Dhaka",
    image: "https://i.ibb.co/album-profile.jpg",
  },
  {
    id: 3,
    name: "Tanvir Ahamed",
    gender: "Male",
    age: 29,
    profession: "Teacher",
    division: "Khulna",
    image: "https://i.ibb.co/album-profile.jpg",
  },
  {
    id: 4,
    name: "Rakib Hasan",
    gender: "Male",
    age: 31,
    profession: "Banker",
    division: "Chattogram",
    image: "https://i.ibb.co/album-profile.jpg",
  },
];

const BiodataDetails = () => {
  const { biodataId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleFavourite = () => {
    // Future: Add API call
    alert("Biodata added to favourites!");
  };

  const handleRequestContact = () => {
    navigate(`/checkout/${dummyBiodata.id}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row">
        <img
          src={dummyBiodata.image}
          alt="Profile"
          className="w-full md:w-1/3 h-72 object-cover"
        />
        <div className="p-6 flex-1">
          <h2 className="text-3xl font-bold mb-2">{dummyBiodata.name}</h2>
          <p className="text-gray-600">Age: {dummyBiodata.age}</p>
          <p className="text-gray-600">Gender: {dummyBiodata.gender}</p>
          <p className="text-gray-600">Height: {dummyBiodata.height}</p>
          <p className="text-gray-600">Profession: {dummyBiodata.profession}</p>
          <p className="text-gray-600">Education: {dummyBiodata.education}</p>
          <p className="text-gray-600">Religion: {dummyBiodata.religion}</p>
          <p className="text-gray-600">Division: {dummyBiodata.division}</p>

          {user.role === "premium" ? (
            <div className="mt-4">
              <p className="text-green-600 flex items-center gap-2">
                <FaEnvelope /> {dummyBiodata.email}
              </p>
              <p className="text-green-600 flex items-center gap-2 mt-1">
                <FaPhone /> {dummyBiodata.phone}
              </p>
            </div>
          ) : (
            <p className="mt-4 text-red-500">
              Contact information is available only to premium members.
            </p>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleFavourite}
              className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
            >
              <FaHeart /> Add to Favourites
            </button>

            {user.role !== "premium" && (
              <button
                onClick={handleRequestContact}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
              >
                Request Contact Info
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Similar biodatas */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-4">Similar Profiles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {similarBiodatas.slice(0, 3).map((biodata) => (
            <div
              key={biodata.id}
              className="bg-white shadow-md rounded-xl overflow-hidden"
            >
              <img
                src={biodata.image}
                alt="Profile"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-xl font-bold">{biodata.name}</h4>
                <p className="text-sm text-gray-500">{biodata.profession}</p>
                <p className="text-sm text-gray-500">
                  Age: {biodata.age}, Division: {biodata.division}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BiodataDetails;
