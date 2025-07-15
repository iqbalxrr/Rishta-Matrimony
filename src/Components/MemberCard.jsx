
import React from "react";
import { useNavigate } from "react-router";

const MemberCard = ({ member }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/biodata/${member.id}`);
  };

  return (
    <div className="bg-white shadow rounded-xl p-6 text-center">
      <img
        src={member.image}
        alt="profile"
        className="w-24 h-24 rounded-full mx-auto border-4 border-rose-500"
      />
      <h3 className="text-lg font-bold mt-2">Biodata ID: {member.id}</h3>
      <p className="text-rose-600">{member.type}</p>
      <p>Age: {member.age}</p>
      <p>Division: {member.division}</p>
      <p>Occupation: {member.occupation}</p>
      <button
        onClick={handleViewProfile}
        className="mt-3 px-4 py-2  bg-rose-600 hover:bg-rose-700 text-white rounded-full"
      >
        View Profile
      </button>
    </div>
  );
};

export default MemberCard;
