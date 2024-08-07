"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { useGetMoviesQuery } from "@/services/TMDB";
import { renderStars } from "@/utils/starts-format";
import SidebarComponent from "@/components/sidebar-component";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import SearchComponent from "@/components/search-component";
import { useRouter } from "next/navigation";
import Pagination from "@/components/Pagination";
import MovieFeatures from "@/components/MovieFeatures";

export default function Home() {

  const [page, setPage] = useState(1);
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<any[] | null>(null);
  const [viewCount, setViewCount] = useState<number>(0);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state: RootState) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });

  const router = useRouter();

  const handleNavigation = (id: number) => {
    router.push(`/movie_details/${id}`);
  };

  useEffect(() => {
    const currentCount = localStorage.getItem('viewCount');
    const newCount = currentCount ? parseInt(currentCount, 10) + 1 : 1;
    localStorage.setItem('viewCount', newCount.toString());
    setViewCount(newCount);
  }, []);

  useEffect(() => {
    if (isFetching) {
      setIsLoading(true);
    } else if (data) {
      setMovies(data.results);
      setIsLoading(false);
    } else if (error) {
      setIsLoading(false);
    }
  }, [data, isFetching, error]);

  if (isLoading) {
    return (
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-white flex items-center justify-center">
        <ImSpinner9 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Something went wrong!</p>
      </div>
    );
  }

  if (!data || !movies) {
    <div className="absolute top-0 right-0 left-0 bottom-0 bg-white flex items-center justify-center">
      <ImSpinner9 className="w-8 h-8 animate-spin" />
    </div>
  };

  return (
    <main className="relative">
      <div className="flex items-start w-full">

        <SidebarComponent viewCount={viewCount} />

        {!showSearchPage && (
          <>
            <div className="relative flex flex-col custom-width">
              <button onClick={() => setShowSearchPage(true)} className="absolute top-2 right-2 bg-white w-[20px] sm:w-[40px] h-[20px] sm:h-[40px] rounded-full shadow-sm shadow-black flex items-center justify-center z-10">
                <Image src="/search.png" alt="search" width={60} height={60} className="object-cover w-[10px] sm:w-[30px] h-[10px] sm:h-[30px]" />
              </button>
              <MovieFeatures movie={data.results[5]} />
              <div>
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
                      <p className="text-center text-xl line-clamp-1 capitalize pt-2">{movie.title}</p>
                      <p className="flex items-center justify-center text-yellow-600">{renderStars(movie.vote_average)}</p>
                    </div>
                  ))}
                </div>
              </div>
              {movies?.length && <Pagination currentPage={page} setPage={setPage} totalPages={data?.total_pages} />}
            </div>
          </>
        )}

        {showSearchPage && (
          <SearchComponent
            movies={movies}
            setShowSearchPage={setShowSearchPage}
            setQuery={setQuery}
            query={query}
            handleNavigation={handleNavigation}
            dataPages={data?.total_pages}
            page={page}
            setPage={setPage}
            length={movies?.length}
          />
        )}
      </div>
    </main>
  );
};
