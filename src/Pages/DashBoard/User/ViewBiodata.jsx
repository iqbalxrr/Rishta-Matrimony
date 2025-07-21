import React, { useState, useContext } from 'react';
import { Dialog } from '@headlessui/react';
import { AuthContext } from '../../../Contex/AuthProvider';
import axiosInstance from '../../../Axios Instance/axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loader from '../../../Components/Loader';
import Swal from 'sweetalert2';

const ViewBiodata = () => {
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const queryClient = useQueryClient();

  // ✅ Fetch biodata using email
  const { data: biodata, isLoading, isError } = useQuery({
    queryKey: ['biodata', user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/biodata?email=${user?.email}`);
      return res.data.data;
    },
    enabled: !!user?.email,
  });

  // ✅ Handle premium request using SweetAlert
  const handlePremiumRequest = async (id) => {

    console.log(id)
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to send request for premium biodata?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, send it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      setIsSending(true);
      try {
        await axiosInstance.patch(`/biodata/request-premium/${id}`);
        await queryClient.invalidateQueries(['biodata', user?.email]);

        Swal.fire("Sent!", "Your request has been sent to the admin.", "success");
        setIsModalOpen(false);
      } catch (err) {
        Swal.fire("Failed!", "Something went wrong. Try again.", "error");
      } finally {
        setIsSending(false);
      }
    }
  };

  if (isLoading) return <Loader />;
  if (isError || !biodata) return <p className="text-center py-10 text-red-500">Biodata not found.</p>;

  return (
    <div className="lg:px-12 py-8">
      <h1 className="text-3xl font-bold text-center subtitle-font mb-8">Your Biodata</h1>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-5 lg:gap-10">
          <img
            src={biodata.profileImage || user?.photoURL}
            alt="Profile"
            className="w-full h-[350px] md:w-40 md:h-40 object-cover border"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            <p><span className="font-semibold">Name:</span> {biodata.name}</p>
            <p><span className="font-semibold">Biodata Type:</span> {biodata.biodataType}</p>
            <p><span className="font-semibold">Date of Birth:</span> {biodata.dob}</p>
            <p><span className="font-semibold">Age:</span> {biodata.age} years</p>
          </div>
        </div>

        <hr />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 text-sm md:text-base">
          <p><span className="font-semibold">Height:</span> {biodata.height} ft</p>
          <p><span className="font-semibold">Weight:</span> {biodata.weight} kg</p>
          <p><span className="font-semibold">Occupation:</span> {biodata.occupation}</p>
          <p><span className="font-semibold">Race (Skin Color):</span> {biodata.race}</p>
          <p><span className="font-semibold">Father's Name:</span> {biodata.fatherName}</p>
          <p><span className="font-semibold">Mother's Name:</span> {biodata.motherName}</p>
          <p><span className="font-semibold">Permanent Division:</span> {biodata.permanentDivision}</p>
          <p><span className="font-semibold">Present Division:</span> {biodata.presentDivision}</p>
          <p><span className="font-semibold">Expected Partner Age:</span> {biodata.expectedPartnerAge}</p>
          <p><span className="font-semibold">Expected Partner Height:</span> {biodata.expectedPartnerHeight} ft</p>
          <p><span className="font-semibold">Expected Partner Weight:</span> {biodata.expectedPartnerWeight} kg</p>
          <p><span className="font-semibold">Email:</span> {biodata.email}</p>
          <p><span className="font-semibold">Mobile:</span> {biodata.mobile}</p>
        </div>

        <div className="text-center pt-6">
          {biodata.isPremium ? (
            <p className="text-green-600 font-bold">✅ Already Premium</p>
          ) : biodata.premiumRequest ? (
            <p className="text-yellow-600 font-semibold">⏳ Premium request already sent</p>
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-lg shadow hover:opacity-90 transition"
            >
              Make Biodata Premium
            </button>
          )}
        </div>
      </div>

      {/* Optional Modal - Not necessary with SweetAlert, but kept for fallback */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
            <Dialog.Title className="text-lg font-bold mb-3">Confirm Premium</Dialog.Title>
            <p>Are you sure you want to make your biodata premium?</p>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => handlePremiumRequest(biodata.bioId)}
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
