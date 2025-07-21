import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../Axios Instance/axios';
import BiodataCard from './BiodataCard';
import Loader from '../../Components/Loader';



const BiodatasPage = () => {
  

    // Filters that user edits live
    const [tempFilters, setTempFilters] = useState({
        ageRange: [18, 60],
        biodataType: '',
        division: ''
    });

    // Filters that apply on clicking "Apply"
    const [filters, setFilters] = useState({
        ageRange: [18, 60],
        biodataType: '',
        division: ''
    });

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    // Fetch all biodatas
    const { data: allBiodata = [], isLoading } = useQuery({
        queryKey: ['biodatas'],
        queryFn: async () => {
            const res = await axiosInstance.get('/biodatas');
            return res.data;
        },
    });

    // Filter biodata based on applied filters
    const filteredBiodata = useMemo(() => {
        return allBiodata.filter(item => {
            const type = item.biodataType ? item.biodataType.toLowerCase() : '';
            const division = item.presentDivision ? item.presentDivision.toLowerCase() : '';

            const matchesType = filters.biodataType ? type === filters.biodataType : true;
            const matchesDivision = filters.division ? division === filters.division.toLowerCase() : true;
            const matchesAge = item.age >= filters.ageRange[0] && item.age <= filters.ageRange[1];

            return matchesAge && matchesType && matchesDivision;
        });
    }, [allBiodata, filters]);

    // Pagination slicing
    const paginatedBiodata = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredBiodata.slice(start, start + itemsPerPage);
    }, [filteredBiodata, currentPage]);

    const totalPages = Math.ceil(filteredBiodata.length / itemsPerPage);

    

    const onApplyFilters = () => {
        setFilters(tempFilters);
        setCurrentPage(1);
    };

    return (
        <div className="max-w-screen-xl min-h-screen mx-auto py-42  px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Filter Section */}
                <div className="bg-white p-4 mt-2 rounded shadow">
                    <h2 className="text-2xl uppercase mb-4 font-semibold text-center">Filter Biodata</h2>

                    <label>Age Range: {tempFilters.ageRange[0]} - {tempFilters.ageRange[1]}</label>
                    <input
                        type="range"
                        min="18"
                        max="60"
                        value={tempFilters.ageRange[0]}
                        onChange={e => {
                            const newStart = Math.min(+e.target.value, tempFilters.ageRange[1]);
                            setTempFilters(f => ({ ...f, ageRange: [newStart, f.ageRange[1]] }));
                        }}
                        className="w-full mb-2"
                    />
                    <input
                        type="range"
                        min="18"
                        max="60"
                        value={tempFilters.ageRange[1]}
                        onChange={e => {
                            const newEnd = Math.max(+e.target.value, tempFilters.ageRange[0]);
                            setTempFilters(f => ({ ...f, ageRange: [f.ageRange[0], newEnd] }));
                        }}
                        className="w-full mb-4"
                    />

                    <label>Biodata Type</label>
                    <select
                        value={tempFilters.biodataType}
                        onChange={e => setTempFilters(f => ({ ...f, biodataType: e.target.value }))}
                        className="w-full mb-4 border rounded p-2"
                    >
                        <option value="">All</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>

                    <label>Division</label>
                    <select
                        value={tempFilters.division}
                        onChange={e => setTempFilters(f => ({ ...f, division: e.target.value }))}
                        className="w-full mb-4 border rounded p-2"
                    >
                        <option value="">All Divisions</option>
                        <option value="dhaka">Dhaka</option>
                        <option value="chattagra">Chattagra</option>
                        <option value="rangpur">Rangpur</option>
                        <option value="barisal">Barisal</option>
                        <option value="khulna">Khulna</option>
                        <option value="mymensingh">Mymensingh</option>
                        <option value="sylhet">Sylhet</option>
                    </select>

                    <button
                        onClick={onApplyFilters}
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    >
                        Apply Filters
                    </button>
                </div>

                {/* Biodata Listing */}
                <div className="md:col-span-2 space-y-4">
                    <h1 className=' border-b-2 pb-4 border-rose-500 uppercase text-xl font-semibold'>total biodata 
                         <span className='text-rose-600 text-2xl subtitle-font'> {allBiodata.length}</span></h1>
                    {isLoading ? (
                        <Loader></Loader>
                    ) : (
                        paginatedBiodata.length === 0 ? (
                            <div className="text-center text-red-500 text-xl">No biodata found.</div>
                        ) : (
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
                                {
                                    paginatedBiodata.map(bio => (
                                        <BiodataCard key={bio._id} data={bio}  />
                                    ))
                                }

                                
                            </div>
                        )
                    )}

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center gap-3 mt-20">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 rounded border ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-200'}`}
                            >
                                Previous
                            </button>
                            {[...Array(totalPages).keys()].map(num => (
                                <button
                                    key={num}
                                    onClick={() => setCurrentPage(num + 1)}
                                    className={`px-3 py-1 rounded border ${currentPage === num + 1 ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`}
                                >
                                    {num + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-1 rounded border ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-200'}`}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BiodatasPage;
