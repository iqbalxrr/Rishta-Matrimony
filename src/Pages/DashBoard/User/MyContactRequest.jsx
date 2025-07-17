import React, { useState } from 'react';
import { toast } from 'react-toastify';

const MyContactRequest = () => {
  // Sample data (replace with backend API later)
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: 'Ayesha Sultana',
      biodataId: 'BID001',
      status: 'approved',
      mobile: '01711223344',
      email: 'ayesha@example.com',
    },
    {
      id: 2,
      name: 'Mizan Rahman',
      biodataId: 'BID002',
      status: 'pending',
      mobile: '',
      email: '',
    },
  ]);

  const handleDelete = (id) => {
    setRequests(requests.filter((req) => req.id !== id));
    toast.success('Deleted successfully!');
  };

  return (
    <div className=" px-4 md:px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">My Contact Requests</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-rose-100 to-pink-100 text-gray-700 text-sm md:text-base uppercase tracking-wide">
            <tr>
              <th className="text-left px-4 py-3 border-b">Name</th>
              <th className="text-left px-4 py-3 border-b">Biodata ID</th>
              <th className="text-left px-4 py-3 border-b">Status</th>
              <th className="text-left px-4 py-3 border-b">Mobile</th>
              <th className="text-left px-4 py-3 border-b">Email</th>
              <th className="text-center px-4 py-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No contact requests found.
                </td>
              </tr>
            ) : (
              requests.map((req, index) => (
                <tr
                  key={req.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}
                >
                  <td className="px-4 py-3 border-b">{req.name}</td>
                  <td className="px-4 py-3 border-b">{req.biodataId}</td>
                  <td className="px-4 py-3 border-b">
                    {req.status === 'approved' ? (
                      <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                        Approved
                      </span>
                    ) : (
                      <span className="inline-block px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-700 rounded-full">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 border-b">
                    {req.status === 'approved' ? req.mobile : 'N/A'}
                  </td>
                  <td className="px-4 py-3 border-b">
                    {req.status === 'approved' ? req.email : 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-center border-b">
                    <button
                      onClick={() => handleDelete(req.id)}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-2 rounded-md transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyContactRequest;
