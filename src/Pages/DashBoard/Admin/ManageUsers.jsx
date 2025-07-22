import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axiosInstance from "../../../Axios Instance/axios";

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["users", searchTerm, roleFilter, page],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/users?name=${searchTerm}&role=${roleFilter}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  const users = data?.users || [];
  const totalPages = data?.totalPages || 1;

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const handleMakeAdmin = async (email) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Make ${email} an Admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (result.isConfirmed) {
      await axiosInstance.patch(`/make-admin/${email}`);
      toast.success("User is now Admin");
      queryClient.invalidateQueries(["users"]);
    }
  };

  const handleMakePremium = async (email) => {
    const result = await Swal.fire({
      title: "Approve Premium?",
      text: `Give premium access to ${email}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (result.isConfirmed) {
      await axiosInstance.patch(`/make-premium/${email}`);
      toast.success("User upgraded to Premium");
      queryClient.invalidateQueries(["users"]);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

      {/* Search & Filter */}
      <form onSubmit={handleSearch} className="mb-6 flex gap-3 flex-wrap">
        <input
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full max-w-xs"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse shadow rounded overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Premium</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4" className="text-center py-5">Loading...</td>
              </tr>
            ) : users.length ? (
              users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    {user.role === "admin" ? (
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
                    {user.premiumRequest ? (
                      <button
                        onClick={() => handleMakePremium(user.email)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Make Premium
                      </button>
                    ) : user.isPremium ? (
                      <span className="text-green-600 font-semibold">Premium</span>
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

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-2">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-1">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageUsers;
