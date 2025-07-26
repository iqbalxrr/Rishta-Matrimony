import React, { useState, useContext } from 'react';
import { Dialog } from '@headlessui/react';
import { AuthContext } from '../../../Contex/AuthProvider';
import axiosInstance from '../../../Axios Instance/axios';
import Swal from 'sweetalert2';
import Loader from '../../../Components/Loader';
import { FaUser, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const ViewBiodata = () => {
  const { user, biodata, isError, isLoading, authUser , refetchAuthUser } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handlePremiumRequest = async (email) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to send request for premium biodata?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, send it!',
      cancelButtonText: 'Cancel',
    });

    if (confirm.isConfirmed) {
      setIsSending(true);
      try {
        await axiosInstance.patch(`/biodata/request-premium/${email}`, {
          bioId: biodata.bioId,
        });

       await refetchAuthUser()

        Swal.fire('Sent!', 'Your request has been sent to the admin.', 'success');
        setIsModalOpen(false);
      } catch (err) {
        Swal.fire('Failed!', 'Something went wrong. Try again.', 'error');
      } finally {
        setIsSending(false);
      }
    }
  };

  if (isLoading) return <Loader />;
  if (isError || !biodata) return <p className="text-center py-10 text-red-500">Biodata not found.</p>;

  return (
    <div className="px-4 lg:px-6 py-10 ">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">📋 View Biodata</h2>

      {/* Profile Section */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md p-4  flex flex-col md:flex-col lg:flex-row items-center gap-5  mb-10 border border-gray-200 transition duration-300 hover:shadow-xl overflow-hidden">
        <div className="relative mb-4 lg:mb-0">
          <img
            src={biodata?.profileImage || user?.photoURL || '/default-avatar.png'}
            alt="Profile"
            className="w-32 lg:ml-10 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[#FFBD0E] shadow-md mx-auto"
          />
          <div className="absolute -bottom-2 right-0 bg-rose-600 text-white text-xs px-3 py-1 rounded-full shadow">
            ID : {biodata?.bioId || 'BD-ID'}
          </div>
        </div>

        <div className=" w-full flex lg:flex-row flex-col justify-evenly   text-gray-800 break-words">
        <div className='lg:space-y-3'>
            <p className="flex gap-2 items-center">
            <FaUser className="text-rose-400" />
            <span className="font-semibold text-gray-600">Name:</span> {biodata?.name}
          </p>
           <p className="flex gap-2 items-center">
            📅 <span className="font-semibold text-gray-600">Age:</span> {biodata?.age} years
          </p>
          
          <p className="flex gap-2 items-center">
            🎂 <span className="font-semibold text-gray-600">Date of Birth:</span> {biodata?.dob}
          </p>
        </div>
         <div className='lg:space-y-3 '>
          
          <p className="flex gap-2 items-center">
            🎯 <span className="font-semibold text-gray-600">Biodata Type:</span>
            <span className="ml-1 inline-block bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full text-sm font-medium">
              {biodata?.biodataType}
            </span>
          </p>
          <p className="flex gap-2 items-center">
            🕵️‍♂️ <span className="font-semibold text-gray-600">Email:</span> {user?.email}
          </p>
          <p className="flex gap-2 items-center">
            ⏰ <span className="font-semibold text-gray-600">Last Updated:</span>{' '}
            {biodata?.updatedAt ? new Date(biodata.updatedAt).toLocaleDateString() : 'N/A'}
          </p>
         </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-b my-6"></div>

      {/* Main Biodata Info */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">
        <div>
          <p className="font-semibold mb-1">👤 Personal Info</p>
          <p>Height: {biodata?.height} ft</p>
          <p>Weight: {biodata?.weight} kg</p>
          <p>Occupation: {biodata?.occupation}</p>
          <p>Race: {biodata?.race}</p>
        </div>

        <div>
          <p className="font-semibold mb-1">👪 Family Info</p>
          <p>Father's Name: {biodata?.fatherName}</p>
          <p>Mother's Name: {biodata?.motherName}</p>
          <p>Permanent Division: {biodata?.permanentDivision}</p>
          <p>Present Division: {biodata?.presentDivision}</p>
        </div>

        <div>
          <p className="font-semibold mb-1">❤️ Partner Preference</p>
          <p>Expected Age: {biodata?.expectedPartnerAge}</p>
          <p>Expected Height: {biodata?.expectedPartnerHeight} ft</p>
          <p>Expected Weight: {biodata?.expectedPartnerWeight} kg</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-b my-6"></div>

      {/* Contact Info */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        <div className="flex items-center text-[15px] gap-2">
          <FaEnvelope className="text-rose-500" />
          <span className="font-semibold">Email:</span> {biodata?.email}
        </div>
        <div className="flex items-center gap-3">
          <FaPhoneAlt className="text-rose-500" />
          <span className="font-semibold">Mobile:</span> {biodata?.mobile}
        </div>
      </div>

      {/* Premium Status */}
      <div className="text-center pt-10">
        {authUser?.isPremium ? (
          <p className="text-green-600 font-bold text-lg">✅ This is a Premium Biodata</p>
        ) : authUser?.premiumRequest ? (
          <p className="text-yellow-600 font-semibold text-lg">⏳ Premium request already sent</p>
        ) : (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-xl shadow hover:opacity-90 transition"
          >
            Make Biodata Premium
          </button>
        )}
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
            <Dialog.Title className="text-lg font-bold mb-3">Confirm Premium Request</Dialog.Title>
            <p className="text-gray-600">Are you sure you want to make your biodata premium?</p>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => handlePremiumRequest(user?.email)}
                disabled={isSending}
                className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700"
              >
                {isSending ? 'Sending...' : 'Yes, Make Premium'}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default ViewBiodata;
