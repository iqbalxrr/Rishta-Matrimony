import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

// 🔁 এখন mock data দিয়ে করছি
const mockPremiumRequests = [
  { id: 1, name: "John Doe", email: "john@example.com", biodataId: "BD101" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", biodataId: "BD102" },
  { id: 3, name: "Hasan Ali", email: "hasan@example.com", biodataId: "BD103" },
];

const ApprovedPremium = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // 👉 future: fetch from backend
    setRequests(mockPremiumRequests);
  }, []);

  const handleMakePremium = (email) => {
    // 👉 future: send PATCH/PUT request to backend
    toast.success(`User ${email} is now Premium!`);

    // optional: remove from list after action
    setRequests((prev) => prev.filter((user) => user.email !== email));
  };

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
              {requests.map(({ id, name, email, biodataId }) => (
                <tr key={id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6">{name}</td>
                  <td className="py-3 px-6">{email}</td>
                  <td className="py-3 px-6">{biodataId}</td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => handleMakePremium(email)}
                      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                    >
                      Make Premium
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
