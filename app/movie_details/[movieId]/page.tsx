'use client';
import { useGetMovieQuery } from '@/services/TMDB';
import { selectGenreOrCategory } from '@/services/current-genre-or-category';
import { useGetRecommendationsQuery } from '@/services/TMDB';
import { renderStars } from '@/utils/starts-format';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { ImSpinner9 } from 'react-icons/im';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

interface DataPage {
    params: {
        movieId: string;
    }
}

const DataPage = ({ params }: DataPage) => {
    const { movieId } = params;
    const { data, error, isFetching } = useGetMovieQuery(movieId);
    const { data: recommendations, isFetching: isRecommendationsFetching } = useGetRecommendationsQuery({ list: '/recommendations', movie_id: movieId });

    const [trailer, setTrailer] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();

    if (isFetching) {
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-white flex items-center justify-center">
            <ImSpinner9 className="w-8 h-8 animate-spin" />
        </div>
    };

    if (error) {
        return <div>Error fetching recommendations</div>;
    }

    if (!recommendations || !Array.isArray(recommendations.results)) {
        return <div className="absolute top-0 right-0 left-0 bottom-0 bg-white flex items-center justify-center">
            <ImSpinner9 className="w-8 h-8 animate-spin" />
        </div>;
    }


    const handleNavigation = (id: number) => {
        router.push(`/movie_details/${id}`);
    };
    return (
        <div className='h-screen p-2 relative'>
            <div className="flex flex-col md:flex-row gap-2 sm:gap-5 md:gap-10 p-2 sm:p-5 md:p-10">
                <div className="relative aspect-video w-full h-[400px] md:min-h-[470px] md:max-h-[470px] md:min-w-[360px] md:max-w-[360px] bg-black rounded-lg overflow-hidden shadow-[0.5em_0.3em_0.5em] md:shadow-[0.5em_1em_1em] shadow-black/50">
                    <Image src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`} alt={data?.title} fill className='object-cover' />
                </div>
                <div className='flex flex-col items-center justify-between'>
                    <div className='space-y-2 p-10'>
                        <p className='text-2xl font-bold capitalize'>{data?.title} ({data?.release_date.split("-")[0]})</p>
                        <p className='text-xl text-center capitalize'>{data?.tagline}</p>
                        <div className='flex flex-col sm:flex-row items-center justify-center gap-2 pt-5'>
                            <p className='flex gap-2 text-yellow-600 text-xl'>{renderStars(data?.vote_average)}</p>
                            <p className='text-2xl'>{data?.vote_average} / 10</p>
                        </div>
                    </div>
                    <p className='text-end font-bold text-slate-400 -mt-4'>{data?.runtime}min {data?.spoken_languages.length > 0 ? `/${data?.spoken_languages[0].name}` : ""}</p>
                    <div className='flex flex-wrap items-center justify-center gap-5 mt-3'>
                        {data?.genres?.map((genre: any) => (
                            <Link key={genre.name} href="/" onClick={() => dispatch(selectGenreOrCategory(genre.id))} className='hover:text-orange-600 hover:underline underline-offset-8 text-xl'>
                                {genre?.name}
                            </Link>
                        ))}
                    </div>
                    <div>
                        <p className='my-2 text-xl font-bold'>Overview</p>
                        <p className='mb-[2rem]'>{data?.overview}</p>
                    </div>
                    <div className='flex items-center gap-4 w-full'>
                        <button onClick={() => setTrailer(true)} className='w-full bg-black text-white p-2 rounded-xl text-center capitalize text-nowrap'>watch trailer</button>
                        <Link target='_blank' rel='noopener noreferrer' href={`https://www.imdb.com/title/${data?.imdb_id}`} className='w-full bg-black text-white p-2 rounded-xl text-center'>IMDB</Link>
                    </div>
                </div>
            </div>
            {trailer &&
                <div className='absolute h-screen pt-10 top-0 right-0 left-0 bottom-0 bg-black/50 z-10 sm:flex md:items-center items-start justify-center'>
                    <button onClick={() => setTrailer(false)} className='absolute top-2 right-2 w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center'>
                        <p className='text-2xl font-bold'>X</p>
                    </button>
                    <div>
                        {data?.videos.results.length > 0 && (
                            <iframe
                                src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
                                className='bg-black w-full h-[400px] sm:min-w-[300px] sm:max-w-[300px] sm:min-h-[300px] sm:max-h-[300px] md:min-w-[600px] md:max-w-[600px] md:min-h-[400px] md:max-h-[400px] rounded-md mt-10'
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                title="Embedded youtube"
                            />
                        )}
                    </div>
                </div>
            }
            <div className='p-5'>
                <p className='my-2 text-xl font-bold'>Top cast</p>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 mt-3 gap-4 items-center justify-center'>
                    {data && data.credits.cast.map((character: any, i: any) => (
                        character.profile_path &&
                        <div key={i} className='flex flex-col items-center shadow-lg shadow-black/50 p-4 hover:scale-105 transition-all duration-200 ease-in-out'>
                            <Image src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name} width={90} height={90} className='w-[100px] h-[100px] rounded-full object-contain' />
                            <p>{character?.name}</p>
                            <p>{character.character.split("/")[0]}</p>
                        </div>
                    )).slice(0, 6)}
                </div>
            </div>

            <div className='w-full mt-[5rem]'>
                <h3 className='-mt-10 mb-10 font-bold capitalize text-2xl text-center'>You might also like</h3>
                <div className="grid custom-grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 p-4">
                    {recommendations.results.slice(0, 8).map((movie: any) => (

                        movie.poster_path &&
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
        </div>
    )
};

export default DataPage;



