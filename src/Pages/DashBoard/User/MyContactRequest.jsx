import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

import Swal from 'sweetalert2';
import axiosInstance from '../../../Axios Instance/axios';
import { AuthContext } from '../../../Contex/AuthProvider';

const MyContactRequest = () => {

  const { biodata } = useContext(AuthContext)

  // console.log(biodata.bioId)

  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ['allContactRequests', biodata?.bioId],
    enabled: !!biodata?.bioId,
    queryFn: async () => {
      const res = await axiosInstance.get(`/all-contact-request/${biodata.bioId}`);
      return res.data;
    },
  });

  console.log(requests)

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/all-contact-request/${id}`);
          Swal.fire('Deleted!', 'Your contact request has been deleted.', 'success');
          refetch();
        } catch (err) {
          Swal.fire('Failed!', 'Something went wrong.', 'error');
        }
      }
    });
  };


  return (
    <div className="px-4 md:px-6 py-10">
      <h2 className="text-2xl font-bold text-center subtitle-font mb-6">My Contact Requests</h2>

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
            {isLoading ? (
              <tr>
                <td colSpan="6" className="text-center py-6">Loading...</td>
              </tr>
            ) : requests.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">No contact requests found.</td>
              </tr>
            ) : (
              requests.map((req, index) => (
                <tr
                  key={req._id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}
                >
                  <td className="px-4 py-3 border-b">{req.requestName || 'N/A'}</td>
                  <td className="px-4 py-3 border-b">{req.requestBioId}</td>
                  <td className="px-4 py-3 border-b">
                    {req.status === 'approved' ? (
                      <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">Approved</span>
                    ) : (
                      <span className="inline-block px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-700 rounded-full">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-3 border-b">{req.status === 'approved' ? req.requestMobile : 'N/A'}</td>
                  <td className="px-4 py-3 border-b">{req.status === 'approved' ? req.requestEmail : 'N/A'}</td>
                  <td className="px-4 py-3 text-center border-b">
                    <button
                      onClick={() => handleDelete(req._id)}
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
