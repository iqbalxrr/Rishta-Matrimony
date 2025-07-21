import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axiosInstance from "../../../Axios Instance/axios";

const ApprovedContactRequest = () => {
  const fetchContactRequests = async () => {
    const res = await axiosInstance.get("/all-contact-request");
    return res.data;
  };

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["contactRequests"],
    queryFn: fetchContactRequests,
  });

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
    <div>
      <h1 className="text-3xl font-bold mb-6">Approve Contact Requests</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <div className="text-gray-500 mt-10 text-center">
          No contact requests found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse shadow-md rounded overflow-hidden">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Biodata ID</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(({ _id, name, email, biodataId, status }) => (
                <tr key={_id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6">{name}</td>
                  <td className="py-3 px-6">{email}</td>
                  <td className="py-3 px-6">{biodataId}</td>
                  <td className="py-3 px-6">
                    {status === "approved" ? (
                      <span className="text-green-600 font-semibold">
                        Approved
                      </span>
                    ) : (
                      <span className="text-yellow-600">Pending</span>
                    )}
                  </td>
                  <td className="py-3 px-6">
                    {status === "approved" ? (
                      <button
                        className="bg-gray-400 text-white px-4 py-1 rounded cursor-not-allowed"
                        disabled
                      >
                        Approved
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApprove(_id)}
                        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                      >
                        Approve Contact
                      </button>
                    )}
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

export default ApprovedContactRequest;
