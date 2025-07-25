import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axiosInstance from "../../../Axios Instance/axios";
import { AuthContext } from "../../../Contex/AuthProvider";

const ApprovedContactRequest = () => {
  const { biodata } = useContext(AuthContext);

  // console.log(biodata.bioId)

  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ['allContactRequests', biodata?.bioId],
    enabled: !!biodata?.bioId,
    queryFn: async () => {
      const res = await axiosInstance.get(`/all-contact-request`);
      return res.data;
    },
  });

  // console.log(requests)

  const handleApprove = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to approve this contact request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosInstance.patch(`/approve-contact/${id}`);
        if (res.data.modifiedCount > 0) {
          toast.success("Contact approved successfully!");
          refetch();
        } else {
          toast.error("Approval failed!");
        }
      } catch (err) {
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <div className="px-2 lg:px-8 py-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        Approve Contact Requests
      </h1>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : requests.length === 0 ? (
        <div className="text-gray-500 mt-10 text-center">
          No contact requests found.
        </div>
      ) : (
        <>
          {/* Table for md and up */}
          <div className="hidden md:block overflow-x-auto  bg-white shadow rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-green-600 text-white">
                <tr className="text-center">
                  <th className="px-2 py-3  text-sm font-semibold ">Name</th>
                  <th className="px-2 py-3 text-sm font-semibold">Email</th>
                  <th className="px-2 py-3  text-sm font-semibold">Biodata ID</th>
                  <th className="px-2 py-3  text-sm font-semibold">Status</th>
                  <th className="px-2 py-3  text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y text-center divide-gray-200">
                {requests.map(({ _id, requestName, requestEmail, requestBioId, status }) => (
                  <tr key={_id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-2 py-3 text-sm">{requestName}</td>
                    <td className="px-2 py-3 text-sm break-all">{requestEmail}</td>
                    <td className="px-2 py-3 text-sm">{requestBioId}</td>
                    <td className="px-2 py-3 text-sm">
                      {status === "approved" ? (
                        <span className="text-green-600 font-medium">Approved</span>
                      ) : (
                        <span className="text-yellow-600 font-medium">Pending</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {status === "approved" ? (
                        <button
                          className="bg-gray-400 text-white px-3 py-1 rounded cursor-not-allowed text-xs"
                          disabled
                        >
                          Approved
                        </button>
                      ) : (
                        <button
                          onClick={() => handleApprove(_id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                        >
                          Approve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card layout for small devices */}
          <div className="md:hidden space-y-4">
            {requests.map(({ _id, requestName, requestEmail, requestBioId, status }) => (
              <div key={_id} className="bg-white shadow rounded-lg p-4">
                <p className="text-sm"><span className="font-semibold">Name:</span> {requestName}</p>
                <p className="text-sm"><span className="font-semibold">Email:</span> {requestEmail}</p>
                <p className="text-sm"><span className="font-semibold">Biodata ID:</span> {requestBioId}</p>
                <p className="text-sm mb-2">
                  <span className="font-semibold">Status:</span>{" "}
                  {status === "approved" ? (
                    <span className="text-green-600 font-medium">Approved</span>
                  ) : (
                    <span className="text-yellow-600 font-medium">Pending</span>
                  )}
                </p>
                {status === "approved" ? (
                  <button
                    className="w-full bg-gray-400 text-white px-3 py-2 rounded cursor-not-allowed text-sm"
                    disabled
                  >
                    Approved
                  </button>
                ) : (
                  <button
                    onClick={() => handleApprove(_id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm"
                  >
                    Approve Contact
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ApprovedContactRequest;