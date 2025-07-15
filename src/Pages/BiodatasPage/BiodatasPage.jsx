import React, { useState } from 'react';
import BiodataCard from './BiodataCard';

const BiodatasPage = () => {
    const [filters, setFilters] = useState({
        ageRange: [18, 40],
        biodataType: '',
        division: ''
    });

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        console.log('Applied Filters:', newFilters);
        // Fetch/filter logic goes here
    };

    return (
        <div className='max-w-screen-xl mx-auto  pt-40 px-4 mb-20'>

            {/* Responsive Grid */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {/* Filter Section */}
                <div className='md:col-span-1  bg-white p-4 rounded-lg shadow'>
                    <h2 className='text-2xl font-semibold text-center subtitle-font mb-4'>Filter Biodata</h2>

                    {/* Age Range */}
                    <div className='mb-4'>
                        <label className='block font-medium mb-1'>
                            Age Range: {filters.ageRange[0]} - {filters.ageRange[1]}
                        </label>
                        <input
                            type='range'
                            min='18'
                            max='60'
                            value={filters.ageRange[0]}
                            onChange={(e) => setFilters({ ...filters, ageRange: [+e.target.value, filters.ageRange[1]] })}
                            className='w-full'
                        />
                        <input
                            type='range'
                            min='18'
                            max='60'
                            value={filters.ageRange[1]}
                            onChange={(e) => setFilters({ ...filters, ageRange: [filters.ageRange[0], +e.target.value] })}
                            className='w-full mt-1'
                        />
                    </div>

                    {/* Biodata Type */}
                    <div className='mb-4'>
                        <label className='block font-medium mb-1'>Biodata Type</label>
                        <select
                            className='w-full border px-3 py-2 rounded'
                            value={filters.biodataType}
                            onChange={(e) => setFilters({ ...filters, biodataType: e.target.value })}
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    {/* Division */}
                    <div className='mb-4'>
                        <label className='block font-medium mb-1'>Division</label>
                        <select
                            className='w-full border px-3 py-2 rounded'
                            value={filters.division}
                            onChange={(e) => setFilters({ ...filters, division: e.target.value })}
                        >
                            <option value="">All Divisions</option>
                            <option value="Dhaka">Dhaka</option>
                            <option value="Chattagram">Chattagram</option>
                            <option value="Rangpur">Rangpur</option>
                            <option value="Barisal">Barisal</option>
                            <option value="Khulna">Khulna</option>
                            <option value="Mymensingh">Mymensingh</option>
                            <option value="Sylhet">Sylhet</option>
                        </select>
                    </div>

                    {/* Apply Button */}
                    <div className="text-right">
                        <button
                            onClick={() => handleFilterChange(filters)}
                            className='bg-blue-500 text-white px-4 py-2 poppins rounded hover:bg-blue-600'
                        >
                            Apply Filter
                        </button>
                    </div>
                </div>

                {/* Biodata Display Section */}
                <div className='md:col-span-2 '>
                    <h1 className='text-xl font-medium pb-2 border-b subtitle-font'>Total Biodata</h1>
                 <div>
                    <BiodataCard></BiodataCard>
                 </div>
                </div>
            </div>
        </div>
    );
};

export default BiodatasPage;
