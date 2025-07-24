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
    <div className="px-2 lg:px-8 py-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        Manage Users
      </h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full max-w-xs"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border  px-10 rounded"
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

      {/* Table for md and up */}
      <div className="hidden md:block overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-green-600 text-white">
            <tr className="text-center">
              <th className="px-2 py-3 text-sm font-semibold">Name</th>
              <th className="px-2 py-3 text-sm font-semibold">Email</th>
              <th className="px-2 py-3 text-sm font-semibold">Role</th>
              <th className="px-2 py-3 text-sm font-semibold">Premium</th>
            </tr>
          </thead>
          <tbody className="divide-y text-center divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan="4" className="text-center py-5 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : users.length ? (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-2 py-3 text-sm">{user.name}</td>
                  <td className="px-2 py-3 text-sm break-all">{user.email}</td>
                  <td className="px-2 py-3 text-sm">
                    {user.role === "admin" ? (
                      <span className="text-green-600 font-medium">Admin</span>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user.email)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                  <td className="px-2 py-3 text-sm">
                    {user.premiumRequest ? (
                      <button
                        onClick={() => handleMakePremium(user.email)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Make Premium
                      </button>
                    ) : user.isPremium ? (
                      <span className="text-green-600 font-medium">Premium</span>
                    ) : (
                      <span className="text-gray-400 italic text-sm">No request</span>
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

      {/* Card layout for small devices */}
      <div className="md:hidden space-y-6">
        {users.map((user) => (
          <div key={user._id} className="bg-white shadow rounded-lg space-y-2 p-4">
            <p className="text-sm "><span className="font-semibold">Name:</span> {user.name}</p>
            <p className="text-sm"><span className="font-semibold">Email:</span> {user.email}</p>
            <p className="text-sm">
              <span className="font-semibold">Role : </span>{" "}
              {user.role === "admin" ? (
                <span className="text-green-600 font-medium">Admin</span>
              ) : (
                <button
                  onClick={() => handleMakeAdmin(user.email)}
                  className="my-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm"
                >
                  Make Admin
                </button>
              )}
            </p>
            <p className="text-sm mb-2">
              <span className="font-semibold">Premium : </span>{" "}
              {user.premiumRequest ? (
                <button
                  onClick={() => handleMakePremium(user.email)}
                  className="my-2 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-sm"
                >
                  Make Premium
                </button>
              ) : user.isPremium ? (
                <span className="text-green-600 font-medium">Premium</span>
              ) : (
                <span className="text-gray-400 italic">No request</span>
              )}
            </p>
          </div>
        ))}
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
