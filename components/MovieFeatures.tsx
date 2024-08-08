import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface MovieFeaturesProps {
    movie: any
}

const MovieFeatures = ({ movie }: MovieFeaturesProps) => {
    return (
        <Link href={`/movie_details/${movie?.id}`} className="relative h-[200px] sm:h-[350px] w-full shadow-lg border-[#000] flex items-center">
            <div className="imageWrapper">
                <Image src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie.title} fill className='featuresImage' />
            </div>
            <div className="w-[170px] sm:w-[200px] md:w-[500px] h-[80px] ml-[30px] sm:mt-20 sm:ml-[20px] pt-3 md:pt-10 z-20 text-[#fff]">
                <p className="uppercase text-[12px] sm:text-xl md:text-2xl">{movie?.title}</p>
                <p className="text-[9px] capitalize sm:text-[10px] md:text-[13px] line-clamp-[5] md:line-clamp-[7]">{movie.overview}</p>
            </div>
        </Link>
    )
}

export default MovieFeatures;