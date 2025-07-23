import React, { useMemo, useState } from "react";
import MemberCard from "./MemberCard";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../Axios Instance/axios";

const PremiumMembers = () => {
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch premium members from backend API
  const { data: members = [], isLoading, isError } = useQuery({
    queryKey: ["allPremiumMembers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/all-premium-members");
      return res.data;
    },
  });

  // Sort members by age according to sortOrder
  const sortedMembers = useMemo(() => {
    return [...members].sort((a, b) =>
      sortOrder === "asc" ? Number(a.age) - Number(b.age) : Number(b.age) - Number(a.age)
    );
  }, [members, sortOrder]);

  if (isLoading) return <p>Loading premium members...</p>;
  if (isError) return <p>Failed to load premium members.</p>;

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div>
            <h4 className="text-[#b98c5e] text-lg subtitle-font font-bold text-center md:text-start">
              Quick Access
            </h4>
            <h2 className="text-3xl lg:text-4xl text-[#66451C] text-center md:text-start font-bold subtitle-font">
              Premium Members
            </h2>
          </div>
          <img src="/flower.png" alt="" className="w-50 md:hidden" />

          <select
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
            className="border border-[#66451C] rounded px-3 py-1 mt-10 md:mt-0 w-[230px]"
          >
            <option value="asc">Sort by Age: Ascending</option>
            <option value="desc">Sort by Age: Descending</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedMembers.map((member) => (
            <MemberCard key={member._id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumMembers;
