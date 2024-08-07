import React, { Dispatch, SetStateAction } from 'react'

interface PaginationProps {
    currentPage: number;
    setPage: Dispatch<SetStateAction<number>>;
    totalPages: number;
}

const Pagination = ({ currentPage, setPage, totalPages }: PaginationProps) => {

    const handlePrev = () => {
        if (currentPage !== 1) {
            setPage((currentPage) => currentPage - 1)
        }
    };

    const handleNext = () => {
        if (currentPage !== totalPages) {
            setPage((currentPage) => currentPage + 1)
        }
    };

    if (totalPages === 0) return null;

    return (
        <div className='my-4'>
            <div className='flex items-center justify-center gap-10 bg-sky-500 w-fit mx-auto rounded-md'>
                <button onClick={handlePrev} className='bg-black text-white py-2 px-7 cursor-pointer rounded-md'>Prev</button>
                <p className='text-2xl font-bold'>{currentPage}</p>
                <button onClick={handleNext} className='bg-black text-white py-2 px-7 cursor-pointer rounded-md'>Next</button>
            </div>
        </div>
    )
}

export default Pagination;