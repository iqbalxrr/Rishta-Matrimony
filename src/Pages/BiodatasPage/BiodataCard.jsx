import React from 'react';
import { FaShareAlt } from 'react-icons/fa';
import { FcShare } from 'react-icons/fc';
import { Link } from 'react-router';

const BiodataCard = ({ data }) => {

    // console.log(data._id)
    return (
        <div className="  bg-white shadow-lg rounded-xl p-4 text-gray-800 font-sans">
            <div className="flex items-center  mb-4">
                <div className='flex gap-4'>
                    <img
                        src={data.profileImage}
                        alt="Profile"
                        className="w-12 h-12 rounded-full border"
                    />
                    <div>
                        <p className="text-sm font-semibold">Biodata Id: <span className='text-pink-600 subtitle-font text-xl'>{data.bioId}</span> </p>
                        <p className="text-sm text-gray-600 uppercase">{data.name}</p>
                    </div>
                </div>
                <div>

                </div>

            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
                <p><strong>Marital Status:</strong></p>
                <p>Unmarried</p>

                <p><strong>District:</strong></p>
                <p>{data.presentDivision
                }</p>

                <p><strong>Date of Birth:</strong></p>
                <p>{data.dob}</p>

                <p><strong>Profession:</strong></p>
                <p>{data.occupation}</p>
            </div>

            <div className="flex justify-between mt-4">
                <button className=" border rounded-full border-pink-500 px-4 py-1"><FaShareAlt size={23} /></button>
                <Link to={`/biodata/${data.bioId}`}><button 
                
                className="bg-pink-600 text-white px-3 py-2 rounded-full text-sm hover:bg-pink-700">
                    View Full Biodata
                </button></Link>
            </div>
        </div>
    );
};

export default BiodataCard;


// Separate component for card
// const BiodataCard = ({ data, onViewProfile }) => (
//   <div className="border p-4 rounded shadow flex gap-4 items-center">
//     <img src={data.profileImage} alt="profile" className="w-20 h-20 object-cover rounded-full" />
//     <div className="flex-grow">
//       <p><b>ID:</b> {data.bioId}</p>
//       <p><b>Type:</b> {data.type}</p>
//       <p><b>Division:</b> {data.division}</p>
//       <p><b>Age:</b> {data.age}</p>
//       <p><b>Occupation:</b> {data.occupation}</p>
//     </div>
//     <button
//       onClick={() => onViewProfile(data.bioId)}
//       className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//     >
//       View Profile
//     </button>
//   </div>
// );