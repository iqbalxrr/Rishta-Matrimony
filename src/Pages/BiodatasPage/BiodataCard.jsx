import React from 'react';

const BiodataCard = () => {
    return (
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-xl p-4 text-gray-800 font-sans">
            <div className="flex items-center  mb-4">
                <div className='flex gap-4'>
                    <img 
                        src="https://via.placeholder.com/50" 
                        alt="Profile" 
                        className="w-12 h-12 rounded-full border"
                    />
                   <div>
                     <p className="text-sm font-semibold">Biodata No: <span className="text-pink-600">1677</span></p>
                    <p className="text-sm text-gray-600">👁️ 1 view</p>
                   </div>
                </div>
                <div>
                    
                </div>
                
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
                <p><strong>Marital Status:</strong></p>
                <p>Unmarried</p>

                <p><strong>District:</strong></p>
                <p>Rajshahi</p>

                <p><strong>Date of Birth:</strong></p>
                <p>17-12-1991</p>

                <p><strong>Profession:</strong></p>
                <p>Businessman</p>
            </div>

            <div className="flex justify-between mt-4">
                <button className="text-blue-600 font-semibold border px-3 py-1 rounded-full ">Share</button>
                <button className="bg-pink-600 text-white px-3 py-1 rounded-full text-sm hover:bg-pink-700">
                    View Full Biodata
                </button>
            </div>
        </div>
    );
};

export default BiodataCard;
