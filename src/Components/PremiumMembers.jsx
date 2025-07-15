import React, { useMemo, useState } from "react";
import MemberCard from "./MemberCard";


const members = [
    { id: 1, type: "Male", image: "https://via.placeholder.com/150", division: "Dhaka", age: 30, occupation: "Engineer" },
    { id: 2, type: "Female", image: "https://via.placeholder.com/150", division: "Chattagram", age: 23, occupation: "Student" },
    { id: 3, type: "Male", image: "https://via.placeholder.com/150", division: "Khulna", age: 35, occupation: "Job" },
    { id: 4, type: "Female", image: "https://via.placeholder.com/150", division: "Barisal", age: 45, occupation: "House Wife" },
    { id: 5, type: "Male", image: "https://via.placeholder.com/150", division: "Sylhet", age: 27, occupation: "Business" },
    { id: 6, type: "Female", image: "https://via.placeholder.com/150", division: "Mymensingh", age: 32, occupation: "Teacher" },
    { id: 7, type: "Male", image: "https://via.placeholder.com/150", division: "Sylhet", age: 27, occupation: "Business" },
    { id: 8, type: "Female", image: "https://via.placeholder.com/150", division: "Mymensingh", age: 32, occupation: "Teacher" },
];

const PremiumMembers = () => {
    const [sortOrder, setSortOrder] = useState("asc");

    const sortedMembers = useMemo(() => {
        return [...members].sort((a, b) =>
            sortOrder === "asc" ? a.age - b.age : b.age - a.age
        );
    }, [sortOrder]);

    return (
        <section className="py-20 ">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row  justify-between items-center mb-6">
                    <div>
                        <h4 className="text-[#b98c5e] text-lg subtitle-font font-bold text-center md:text-start ">Quick Access</h4>
                        <h2 className="text-3xl lg:text-4xl text-[#66451C] text-center md:text-start  font-bold subtitle-font">Premium Members</h2>
                    </div>
                   <img src="/flower.png" alt="" className="w-50 md:hidden" />
         
                    <select
                        onChange={(e) => setSortOrder(e.target.value)}
                        value={sortOrder}
                        className="border border-rose-500 rounded px-3 py-1 mt-10 md:mt-0 w-[230px]"
                    >
                        <option value="asc">Sort by Age: Ascending</option>
                        <option value="desc">Sort by Age: Descending</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {sortedMembers.map((member) => (
                        <MemberCard key={member.id} member={member} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PremiumMembers;
