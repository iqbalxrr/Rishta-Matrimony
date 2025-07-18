import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

// 🔁 mock data (backend replace করা যাবে)
const mockContactRequests = [
  { id: 1, name: "Nusrat Jahan", email: "nusrat@example.com", biodataId: "BD501" },
  { id: 2, name: "Sabbir Rahman", email: "sabbir@example.com", biodataId: "BD502" },
  { id: 3, name: "Tanjila Akter", email: "tanjila@example.com", biodataId: "BD503" },
];

const ApprovedContactRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // ⏬ future: fetch from backend
    setRequests(mockContactRequests);
  }, []);

  const handleApprove = (email) => {
    // ✅ future: send approval to backend
    toast.success(`Contact request approved for ${email}`);
    // Remove approved item from UI
    setRequests((prev) => prev.filter((item) => item.email !== email));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Approve Contact Requests</h1>

      {requests.length === 0 ? (
        <div className="text-gray-500 mt-10 text-center">No contact requests found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse shadow-md rounded overflow-hidden">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Biodata ID</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(({ id, name, email, biodataId }) => (
                <tr key={id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6">{name}</td>
                  <td className="py-3 px-6">{email}</td>
                  <td className="py-3 px-6">{biodataId}</td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => handleApprove(email)}
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                    >
                      Approve Contact
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

export default ApprovedContactRequest;
