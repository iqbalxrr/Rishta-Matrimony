import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import axiosInstance from '../../../Axios Instance/axios';
import { AuthContext } from '../../../Contex/AuthProvider';

const MyFavouritesBiodata = () => {

  const {user} = useContext(AuthContext)

  const Authemail = user?.email;

  // 🔹 Data load function
  const fetchFavourites = async () => {
    const res = await axiosInstance.get(`/myfevorites?email=${Authemail}`);
    return res.data;
  };

  // 🔹 Load data using TanStack Query
  const { data: favourites = [], refetch, isLoading, isError } = useQuery({
    queryKey: ['favourites'],
    queryFn: fetchFavourites,
  });

  // 🔹 Delete handler with SweetAlert
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
        refetch(); // Reload data
      } catch (error) {
        console.log(error)
        Swal.fire('Error', 'Failed to delete biodata.', 'error');
      }
    }
  };

  return (
    <div className="px-4 md:px-6 py-10">
      <h2 className="text-2xl font-bold text-center subtitle-font mb-6">My Favourite Biodatas</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-rose-100 to-pink-100 text-gray-700 text-sm md:text-base uppercase tracking-wide">
            <tr>
              <th className="text-left px-4 py-3 border-b">Name</th>
              <th className="text-left px-4 py-3 border-b">Biodata ID</th>
              <th className="text-left px-4 py-3 border-b">Permanent Address</th>
              <th className="text-left px-4 py-3 border-b">Occupation</th>
              <th className="text-center px-4 py-3 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-red-500">
                  Failed to load data.
                </td>
              </tr>
            ) : favourites.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No favourite biodatas found.
                </td>
              </tr>
            ) : (
              favourites.map((bio, index) => (
                <tr
                  key={bio._id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}
                >
                  <td className="px-4 py-3 border-b">{bio.name}</td>
                  <td className="px-4 py-3 border-b">{bio.bioId}</td>
                  <td className="px-4 py-3 border-b">{bio.presentDivision}</td>
                  <td className="px-4 py-3 border-b">{bio.occupation}</td>
                  <td className="px-4 py-3 text-center border-b">
                    <button
                      onClick={() => handleDelete(bio._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-xs transition"
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

export default MyFavouritesBiodata;
