import React, { useContext } from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { FaHeart, FaEnvelope, FaPhone } from "react-icons/fa";
import axiosInstance from "../Axios Instance/axios";
import RelatedProfiles from "./RelatedProfiles";
import Loader from "./Loader";
import Swal from "sweetalert2";
import { AuthContext } from "../Contex/AuthProvider";


const BiodataDetails = () => {
  const { biodataId } = useParams();
  const { user , authUser } = useContext(AuthContext);

  const Authemail = user?.email ;

  const { data: biodata, isLoading, isError } = useQuery({
    queryKey: ["biodata", biodataId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/biodatabyid/${biodataId}`);
      return res.data;
    },
    enabled: !!biodataId,
  });
  const handleFavourite = async (biodata) => {
    const { name, presentDivision, occupation, bioId  } = biodata;

    const data = { name, presentDivision, occupation, bioId , Authemail };

    try {
      const res = await axiosInstance.post("/addfevorites", data);

      console.log(res)
      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: `${name} has been added to your favourites.`,
        timer: 2000,
        showConfirmButton: false,
      });

    } catch (error) {
      if (error.response?.status === 409) {
        Swal.fire({
          icon: 'info',
          title: 'Already Added',
          text: `${name} is already in your favourites.`,
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while adding to favourites!',
        });
        console.error("Add to favourites error:", error);
      }
    }
  };

  // const handleRequestContact = (bioId) => {
  //   navigate(`/checkout/${bioId}`);
  // };

  if (isLoading)
    return <Loader></Loader>
  if (isError || !biodata)
    return (
      <div className="text-center text-red-500 p-10">
        Failed to load biodata.
      </div>
    );

  return (
    <div className="min-h-screen bg-amber-50 pt-12 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 p-4 md:h-[100vh]">

        {/* Left: Fixed Image */}
        <div className="h-auto md:h-[100vh] md:sticky md:top-0 mt-12 md:mt-0 overflow-hidden rounded-xl">
          <img
            src={biodata.profileImage}
            alt="Profile"
            className="w-full h-auto md:h-full object-cover rounded-xl"
          />
        </div>

        {/* Right: Scrollable Content */}
        <div className="overflow-visible pt-6 pb-16 px-1 md:overflow-y-auto md:h-[100vh] md:pt-12 md:pr-3 hide-scrollbar">
          <h1 className="text-3xl subtitle-font font-bold text-[#7c4d0c] uppercase">
            {biodata.name}
          </h1>

          <div className="flex flex-wrap gap-3 mt-4">
            <div className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm">
              City: {biodata.presentDivision}
            </div>
            <div className="bg-pink-200 text-pink-800 px-3 py-1 rounded-full text-sm">
              Age: {biodata.age}
            </div>
            <div className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">
              Height: {biodata.height}
            </div>
            <div className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">
              Job: {biodata.occupation}
            </div>
          </div>

          {/* Intro */}
          <div className="mt-6 text-gray-700 text-sm leading-relaxed">
            <p>
              Hi, I'm <strong>{biodata.name}</strong>. I'm currently working as a{" "}
              <strong>{biodata.occupation}</strong>. I belong to a{" "}
              <strong>{biodata.race}</strong> background and live in{" "}
              <strong>{biodata.presentDivision}</strong>. I'm looking for a
              partner aged around{" "}
              <strong>{biodata.expectedPartnerAge}</strong> with height around{" "}
              <strong>{biodata.expectedPartnerHeight}</strong> and weight around{" "}
              <strong>{biodata.expectedPartnerWeight}kg</strong>.
            </p>
          </div>

          {/* Photo Gallery */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2 text-gray-700">
              Photo Gallery
            </h3>
            <div className="flex gap-3">
              {[...Array(3)].map((_, i) => (
                <img
                  key={i}
                  src={biodata.profileImage}
                  className="w-20 h-20 rounded-md object-cover"
                  alt="Gallery"
                />
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2 text-gray-700">
              Contact Info
            </h3>
            {authUser.isPremium  ? (
              <div>
                <p className="flex items-center gap-2 text-green-700">
                  <FaPhone /> {biodata.mobile}
                </p>
                <p className="flex items-center gap-2 text-green-700">
                  <FaEnvelope /> {biodata.email}
                </p>
              </div>
            ) : (
              <p className="text-red-500">
                Contact info is available only for premium members.
              </p>
            )}
          </div>

          {/* Personal Info */}
          <h3 className="font-semibold text-lg my-4 text-gray-700">Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-800">
            <p><strong>Father's Name:</strong> {biodata.fatherName}</p>
            <p><strong>Mother's Name:</strong> {biodata.motherName}</p>
            <p><strong>Date of Birth:</strong> {biodata.dob}</p>
            <p><strong>Weight:</strong> {biodata.weight}kg</p>
            <p><strong>Permanent Division:</strong> {biodata.permanentDivision}</p>
            <p><strong>Bio ID:</strong> #{biodata.bioId}</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => handleFavourite(biodata)}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2"
            >
              <FaHeart /> Add to Favourites
            </button>
            {user.role !== "premium" && (
              <Link
                to={`/checkout/${biodata.bioId}`}
                className=""
              >
                <button className="bg-blue-600 hover:bg-blue-700 w-full text-white px-6 py-2 rounded-lg">
                  Request Contact Info
                </button>
              </Link>

            )}
          </div>

          {/* Related Profiles */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">RELATED PROFILES</h2>
            <div className="grid grid-cols-1    gap-4">
              <RelatedProfiles />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiodataDetails;
