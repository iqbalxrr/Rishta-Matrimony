import React, { useState } from 'react';
import { toast } from 'react-toastify';

const MyFavouritesBiodata = () => {
  const [favourites, setFavourites] = useState([
    {
      id: 1,
      name: 'Tania Akter',
      biodataId: 'BID120',
      permanentAddress: 'Dhaka, Bangladesh',
      occupation: 'Software Engineer',
    },
    {
      id: 2,
      name: 'Rafiq Hasan',
      biodataId: 'BID105',
      permanentAddress: 'Khulna, Bangladesh',
      occupation: 'Doctor',
    },
  ]);

  const handleDelete = (id) => {
    setFavourites(favourites.filter((bio) => bio.id !== id));
    toast.success('Removed from favourites');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">My Favourite Biodatas</h2>

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
            {favourites.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No favourite biodatas found.
                </td>
              </tr>
            ) : (
              favourites.map((bio, index) => (
                <tr
                  key={bio.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}
                >
                  <td className="px-4 py-3 border-b">{bio.name}</td>
                  <td className="px-4 py-3 border-b">{bio.biodataId}</td>
                  <td className="px-4 py-3 border-b">{bio.permanentAddress}</td>
                  <td className="px-4 py-3 border-b">{bio.occupation}</td>
                  <td className="px-4 py-3 text-center border-b">
                    <button
                      onClick={() => handleDelete(bio.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-xs transition"
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
