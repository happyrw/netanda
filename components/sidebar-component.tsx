"use client"
import { selectGenreOrCategory } from '@/services/current-genre-or-category';
import { useGetGenresQuery } from '@/services/TMDB'
import { allGenreIds, itemsCategories } from '@/utils/constants';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';

import { FaRegEye } from "react-icons/fa";

const SidebarComponent = ({ viewCount }: { viewCount: number }) => {

    const { genreIdOrCategoryName } = useSelector((state: RootState) => state.currentGenreOrCategory)
    const [categories, setCategories] = useState<any[] | null>(null);
    const { data, error, isFetching } = useGetGenresQuery({});
    const [show, setShow] = useState(false);

    const items = itemsCategories;
    const dispatch = useDispatch();


    useEffect(() => {
        if (data) {
            const genresWithIcons = data.genres.map((genre: any) => {
                const matchedIcon = allGenreIds.find((g) => g.name.toLowerCase() === genre.name.toLowerCase())?.icon;
                return { ...genre, icon: matchedIcon || '' };
            });
            setCategories(genresWithIcons);
        }
    }, [data]);

    return (
        <div className="bg-black/10 sticky top-0 h-screen w-[70px] sm:min-w-[200px] md:min-w-[220px] lg:min-w-[220px] overflow-y-auto">
            <p onClick={() => setShow(true)} className="sticky top-0  text-[10px] sm:text-[15px] text-center font-bold shadow-lg border-[#000] pb-5 z-10 h-20 pt-10 bg-white">MENU</p>
            <div>
                <p className='font-[200] mt-5 sm:pl-2 capitalize text-[8px] sm:text-[14px] text-center sm:text-start'>categories</p>
                {items && items.map((category, index) => (
                    <div key={index} onClick={() => {
                        dispatch(selectGenreOrCategory(category.value))
                    }}>
                        <div className="hidden sm:flex items-center gap-5 p-3 pl-5 md:pl-2 mt-2 cursor-pointer text-black hover:bg-slate-100 rounded-lg">
                            <img src={category.icon} alt={category.name} className="w-[25px] h-[25px] object-cover" />
                            <p className="text-xl hidden sm:flex">{category.name}</p>
                        </div>

                        <div className="flex sm:hidden pl-5 sm:pl-2 mt-5 cursor-pointer text-black hover:bg-slate-100 rounded-lg">
                            <img src={category.icon} alt={category.name} className="w-[30px] h-[30px] object-cover mt-5" />
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <p className='font-[200] mt-5 sm:pl-2 capitalize text-[8px] sm:text-[14px] text-center sm:text-start'>genres</p>
                {categories && categories.map((category, index) => (
                    <div key={index} onClick={() => {
                        dispatch(selectGenreOrCategory(category.id))
                    }}>
                        <div className="hidden sm:flex items-center gap-5 p-3 pl-5 md:pl-2 mt-2 cursor-pointer text-black hover:bg-slate-100 rounded-lg">
                            <img src={category.icon} alt={category.name} className="w-[25px] h-[25px] object-cover" />
                            <p className="text-xl hidden sm:flex">{category.name}</p>
                        </div>

                        <div className="flex sm:hidden pl-5 sm:pl-2 mt-5 cursor-pointer text-black hover:bg-slate-100 rounded-lg">
                            <img src={category.icon} alt={category.name} className="w-[30px] h-[30px] object-cover mt-5" />
                        </div>
                    </div>
                ))}
            </div>
            {show && <p className='text-center flex items-center justify-center font-bold'>{viewCount}<FaRegEye className='w-5 h-5 ml-2' /></p>}
        </div>
    )
}

export default SidebarComponent;

