import { searchMovie } from '@/services/current-genre-or-category';
import { renderStars } from '@/utils/starts-format'
import Image from 'next/image'
import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import Pagination from './Pagination';

interface SearchComponentProps {
    movies: any[] | null;
    setShowSearchPage: Dispatch<SetStateAction<boolean>>;
    setQuery: Dispatch<SetStateAction<string>>;
    query: string;
    handleNavigation: (id: number) => void;
    setPage: Dispatch<SetStateAction<number>>;
    dataPages: number;
    page: number;
    length: number | undefined;
}

const SearchComponent = ({ movies, setShowSearchPage, setQuery, query, handleNavigation, setPage, page, dataPages, length }: SearchComponentProps) => {

    const dispatch = useDispatch();
    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            dispatch(searchMovie(query));
        }
    };

    // if (!length) {
    //     return (
    //         <div className="text-center text-gray-600">No results found for "{query}"</div>
    //     )
    // }

    return (
        <div className="h-screen custom-width bg-slate-300 overflow-y-auto">
            <div className="relative flex items-center justify-center p-4">
                <button onClick={() => {
                    setShowSearchPage(false)
                    dispatch(searchMovie(''));
                    setQuery('');
                }} className="absolute top-2 right-2 font-bold cursor-pointer text-red-600">X</button>
                <div className="flex items-center justify-center bg-yellow-400 rounded-xl overflow-hidden">
                    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={handleKeyPress} className="w-[250px] sm:w-[350px] md:w-[550px] text-sm md:text-xl p-[7px_5px_5px_10px] border-0 outline-none" />
                </div>
            </div>
            <div className="grid custom-grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 p-4">
                {movies && movies.map((movie) => (
                    <div key={movie.id} onClick={() => handleNavigation(movie.id)} className="rounded-lg transition-all duration-200 ease-in-out hover:scale-105 h-[300px] lg:h-[400px] relative">
                        <Image
                            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://www.fillmurray.com/200/300"}
                            alt={movie.title}
                            width={100}
                            height={100}
                            className="rounded-lg object-cover w-full h-[250px] lg:h-[350px]"
                        />
                        <p className="text-center text-xl line-clamp-1 capitalize pt-2">{movie?.title}</p>
                        <p className="flex items-center justify-center">{renderStars(movie.vote_average)}</p>
                    </div>
                ))}
            </div>
            {!length && <div className="text-center text-gray-600">No results found for {query}</div>}
            {length !== 0 && <Pagination currentPage={page} setPage={setPage} totalPages={dataPages} />}
        </div>
    )
}

export default SearchComponent;