import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

import { toast } from "react-toastify";
import axiosInstance from "../../../Axios Instance/axios";

const fetchPremiumRequests = async () => {
  const res = await axiosInstance.get("/premium-requests");
  return res.data;
};

const ApprovedPremium = () => {
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["premiumRequests"],
    queryFn: fetchPremiumRequests,
  });

  const handleMakePremium = async (_id, email) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Approve ${email} as a Premium member?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, approve it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.patch(`/make-premium/${_id}`);
        toast.success(`User ${email} is now Premium!`);
        queryClient.invalidateQueries(["premiumRequests"]); 
      } catch (error) {
        toast.error("Failed to approve premium");
      }
    }
  };

  if (isLoading) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Approve Premium Requests</h1>

      {requests.length === 0 ? (
        <div className="text-gray-500 mt-10 text-center">No premium requests found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse shadow-md rounded overflow-hidden">
            <thead className="bg-yellow-500 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Biodata ID</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(({ _id, name, email, bioId }) => (
                <tr key={_id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6">{name}</td>
                  <td className="py-3 px-6">{email}</td>
                  <td className="py-3 px-6">{bioId}</td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => handleMakePremium(_id, email)}
                      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                    >
                      Approve Premium
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ApprovedPremium;
