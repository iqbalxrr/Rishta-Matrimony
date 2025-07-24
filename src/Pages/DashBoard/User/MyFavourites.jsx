import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import axiosInstance from '../../../Axios Instance/axios';
import { AuthContext } from '../../../Contex/AuthProvider';

const MyFavouritesBiodata = () => {
  const { user } = useContext(AuthContext);
  const Authemail = user?.email;

  const fetchFavourites = async () => {
    const res = await axiosInstance.get(`/myfevorites?email=${Authemail}`);
    return res.data;
  };

  const { data: favourites = [], refetch, isLoading, isError } = useQuery({
    queryKey: ['favourites'],
    queryFn: fetchFavourites,
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to remove this favourite biodata?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e3342f',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/deletefevorite/${id}`);
        Swal.fire('Deleted!', 'Biodata has been removed.', 'success');
        refetch();
      } catch (error) {
        Swal.fire('Error', 'Failed to delete biodata.', 'error');
      }
    }
  };

  return (
    <div className="px-2 lg:px-8 py-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        My Favourite Biodatas
      </h2>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : isError ? (
        <p className="text-center text-red-500">Failed to load data.</p>
      ) : favourites.length === 0 ? (
        <div className="text-gray-500 mt-10 text-center">No favourite biodatas found.</div>
      ) : (
        <>
          {/* Table for md and up */}
          <div className="hidden md:block overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-green-600 text-white">
                <tr className="text-center">
                  <th className="px-2 py-3 text-sm font-semibold">Name</th>
                  <th className="px-2 py-3 text-sm font-semibold">Biodata ID</th>
                  <th className="px-2 py-3 text-sm font-semibold">Address</th>
                  <th className="px-2 py-3 text-sm font-semibold">Occupation</th>
                  <th className="px-2 py-3 text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y text-center divide-gray-200">
                {favourites.map((bio) => (
                  <tr key={bio._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-2 py-5 text-sm">{bio.name}</td>
                    <td className="px-2 py-5 text-sm">{bio.bioId}</td>
                    <td className="px-2 py-5 text-sm">{bio.presentDivision}</td>
                    <td className="px-2 py-5 text-sm">{bio.occupation}</td>
                    <td className="px-2 py-5 text-sm">
                      <button
                        onClick={() => handleDelete(bio._id)}
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
            {favourites.map((bio) => (
              <div key={bio._id} className="bg-white shadow rounded-lg p-4">
                <p className="text-sm">
                  <span className="font-semibold">Name:</span> {bio.name}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Biodata ID:</span> {bio.bioId}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Address:</span> {bio.presentDivision}
                </p>
                <p className="text-sm mb-2">
                  <span className="font-semibold">Occupation:</span> {bio.occupation}
                </p>
                <button
                  onClick={() => handleDelete(bio._id)}
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

export default MyFavouritesBiodata;
