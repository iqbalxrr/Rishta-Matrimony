import React from "react";
import { Link } from "react-router";


const MemberCard = ({ member }) => {




  return (
    <div className="bg-white shadow rounded-xl p-6 text-center">
      <img
        src={member.profileImage}
        alt={member.name}
        className="w-24 h-24 rounded-full mx-auto border-4 border-rose-500 object-cover"
      />
      <h3 className="text-lg font-bold mt-2">{member.name}</h3>
      <p className="text-rose-600">{member.biodataType}</p>
      <p>Age: {member.age}</p>
      <p>Division: {member.presentDivision}</p>
      <p>Occupation: {member.occupation}</p>

      <div>
        <Link to={`/biodata/${member.bioId}`}><button

          className="mt-3 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-full">
          View Full Biodata
        </button></Link>
      </div>

    </div >
  );
};

export default MemberCard;
