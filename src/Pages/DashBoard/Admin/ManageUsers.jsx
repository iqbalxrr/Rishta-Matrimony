import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

// 🔁 mock data (পরে backend থেকে fetch করবে)
const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", isAdmin: false, isPremiumRequested: true },
  { id: 2, name: "Jane Smith", email: "jane@example.com", isAdmin: false, isPremiumRequested: false },
  { id: 3, name: "Admin User", email: "admin@example.com", isAdmin: true, isPremiumRequested: false },
];

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // এখানে তুমি পরে backend থেকে fetch করবে
  useEffect(() => {
    setUsers(mockUsers); // এখন mock data use করছি
  }, []);

  const handleMakeAdmin = (email) => {
    // 🔁 এখানে backend request যাবে
    toast.success(`Admin made: ${email}`);
  };

  const handleMakePremium = (email) => {
    // 🔁 এখানে backend request যাবে
    toast.success(`Premium made: ${email}`);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    // 🔁 এখানে real server-side search হবে
    const filtered = mockUsers.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers(filtered);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

      {/* Search */}
      <form onSubmit={handleSearch} className="mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full max-w-xs"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse shadow rounded overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Make Admin</th>
              <th className="py-3 px-4 text-left">Make Premium</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    {user.isAdmin ? (
                      <span className="text-green-600 font-semibold">Admin</span>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user.email)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {user.isPremiumRequested ? (
                      <button
                        onClick={() => handleMakePremium(user.email)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Make Premium
                      </button>
                    ) : (
                      <span className="text-gray-400 italic">No request</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-5 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
