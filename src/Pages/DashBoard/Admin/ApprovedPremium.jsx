import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axiosInstance from "../../../Axios Instance/axios";

const fetchPremiumRequests = async () => {
  const res = await axiosInstance.get("/requestedpremiumuser");
  return res.data;
};

const ApprovedPremium = () => {
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["premiumRequests"],
    queryFn: fetchPremiumRequests,
  });

  const handleMakePremium = async (email) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Approve ${email} as a Premium member?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, approve it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.patch(`/make-premium/${email}`);

        await Swal.fire({
          icon: "success",
          title: "Approved!",
          text: `${email} is now a premium user.`,
        });

        queryClient.invalidateQueries(["premiumRequests"]);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while approving!",
        });
      }
    }
  };

  return (
    <div className="px-2 lg:px-8 py-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        Approve Premium Requests
      </h1>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : requests.length === 0 ? (
        <div className="text-gray-500 mt-10 text-center">
          No premium requests found.
        </div>
      ) : (
        <>
          {/* Table for md and up */}
          <div className="hidden md:block overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-green-600 text-white">
                <tr className="text-center">
                  <th className="px-2 py-3 text-sm font-semibold">Name</th>
                  <th className="px-2 py-3 text-sm font-semibold">Email</th>
                  <th className="px-2 py-3 text-sm font-semibold">Biodata ID</th>
                  <th className="px-2 py-3 text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y text-center divide-gray-200">
                {requests.map(({ _id, name, email, bioId }) => (
                  <tr key={_id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-2 py-3 text-sm">{name}</td>
                    <td className="px-2 py-3 text-sm break-all">{email}</td>
                    <td className="px-2 py-3 text-sm">{bioId}</td>
                    <td className="px-2 py-3 text-sm">
                      <button
                        onClick={() => handleMakePremium(email)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                      >
                        Approve Premium
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card layout for small devices */}
          <div className="md:hidden space-y-4">
            {requests.map(({ _id, name, email, bioId }) => (
              <div key={_id} className="bg-white shadow rounded-lg p-4">
                <p className="text-sm">
                  <span className="font-semibold">Name:</span> {name}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Email:</span> {email}
                </p>
                <p className="text-sm mb-2">
                  <span className="font-semibold">Biodata ID:</span> {bioId}
                </p>
                <button
                  onClick={() => handleMakePremium(email)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm"
                >
                  Approve Premium
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ApprovedPremium;
