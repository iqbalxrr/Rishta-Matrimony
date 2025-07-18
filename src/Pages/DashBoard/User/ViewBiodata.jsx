import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AuthContext } from '../../../Contex/AuthProvider';


const ViewBiodata = () => {
  const{user} = useContext(AuthContext)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Sample biodata (replace with backend data later)
  const biodata = {
    biodataType: "Female",
    name: "Ayesha Sultana",
    profileImage: `${user?.photoURL}`,
    dob: "1999-01-10",
    height: 5.4,
    weight: 52,
    age: 25,
    occupation: "Teacher",
    race: "Fair",
    fatherName: "Md. Ali",
    motherName: "Rokeya Begum",
    permanentDivision: "Khulna",
    presentDivision: "Dhaka",
    expectedPartnerAge: "26-30",
    expectedPartnerHeight: "5.6-5.10",
    expectedPartnerWeight: "65-75",
    email: "ayesha@example.com",
    mobile: "01711223344",
  };

  const handlePremiumRequest = async () => {
    setIsSending(true);
    try {
      // Replace this with your API call to send request to admin
      await new Promise((res) => setTimeout(res, 1000));
      toast.success('Biodata has been sent for premium approval.');
    } catch (err) {
        console.log(err)
      toast.error('Failed to send request. Try again.');
    } finally {
      setIsSending(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className=" lg:px-12 py-8">
      <h1 className="text-3xl font-bold text-center subtitle-font mb-8">Your Biodata</h1>

      <div className="  space-y-6">
        <div className="flex flex-col md:flex-row  gap-5 lg:gap-10">
          <img
            src={biodata.profileImage}
            alt="Profile"
            className=" w-full h-[350px] md:w-40 md:h-40  object-cover border"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            <p><span className="font-semibold">Name:</span> {biodata.name}</p>
            <p><span className="font-semibold">Biodata Type:</span> {biodata.biodataType}</p>
            <p><span className="font-semibold">Date of Birth:</span> {biodata.dob}</p>
            <p><span className="font-semibold">Age:</span> {biodata.age} years</p>
          </div>
        </div>

        <hr />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 text-sm  md:text-base">
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
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-lg shadow hover:opacity-90 transition"
          >
            Make Biodata Premium
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
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
                onClick={handlePremiumRequest}
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
