import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import axiosInstance from '../../../Axios Instance/axios';
import { AuthContext } from '../../../Contex/AuthProvider';

const MyContactRequest = () => {
  const { biodata } = useContext(AuthContext);

  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ['allContactRequests', biodata?.bioId],
    enabled: !!biodata?.bioId,
    queryFn: async () => {
      const res = await axiosInstance.get(`/all-contact-request/${biodata.bioId}`);
      return res.data;
    },
  });

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
    <div className="px-2 lg:px-8 py-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        My Contact Requests
      </h2>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : requests.length === 0 ? (
        <div className="text-gray-500 mt-10 text-center">No contact requests found.</div>
      ) : (
        <>
          {/* Table for md and up */}
          <div className="hidden md:block overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-green-600 text-white">
                <tr className="text-center">
                  <th className="px-2 py-3 text-sm font-semibold">Name</th>
                  <th className="px-2 py-3 text-sm font-semibold">Biodata ID</th>
                  <th className="px-2 py-3 text-sm font-semibold">Status</th>
                  <th className="px-2 py-3 text-sm font-semibold">Mobile</th>
                  <th className="px-2 py-3 text-sm font-semibold">Email</th>
                  <th className="px-2 py-3 text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y text-center divide-gray-200">
                {requests.map((req) => (
                  <tr key={req._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-2 py-5 text-sm">{req.requestName || 'N/A'}</td>
                    <td className="px-2 py-5 text-sm">{req.requestBioId}</td>
                    <td className="px-2 py-5 text-sm">
                      {req.status === 'approved' ? (
                        <span className="text-green-600 font-medium">Approved</span>
                      ) : (
                        <span className="text-yellow-600 font-medium">Pending</span>
                      )}
                    </td>
                    <td className="px-2 py-5 text-sm">
                      {req.status === 'approved' ? req.requestMobile : 'N/A'}
                    </td>
                    <td className="px-2 py-5 text-sm break-all">
                      {req.status === 'approved' ? req.requestEmail : 'N/A'}
                    </td>
                    <td className="px-2 py-5 text-sm">
                      <button
                        onClick={() => handleDelete(req._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card layout for small devices */}
          <div className="md:hidden space-y-4">
            {requests.map((req) => (
              <div key={req._id} className="bg-white shadow rounded-lg p-4">
                <p className="text-sm">
                  <span className="font-semibold">Name:</span> {req.requestName || 'N/A'}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Biodata ID:</span> {req.requestBioId}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Status:</span>{" "}
                  {req.status === 'approved' ? (
                    <span className="text-green-600 font-medium">Approved</span>
                  ) : (
                    <span className="text-yellow-600 font-medium">Pending</span>
                  )}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Mobile:</span>{" "}
                  {req.status === 'approved' ? req.requestMobile : 'N/A'}
                </p>
                <p className="text-sm mb-2">
                  <span className="font-semibold">Email:</span>{" "}
                  {req.status === 'approved' ? req.requestEmail : 'N/A'}
                </p>
                <button
                  onClick={() => handleDelete(req._id)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyContactRequest;
