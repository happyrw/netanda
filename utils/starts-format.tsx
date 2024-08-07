import React from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

export const renderStars = (rating?: number) => {
    // Default rating to 0 if undefined or not a valid number
    const validRating = typeof rating === 'number' && !isNaN(rating) ? rating : 0;

    const fullStars = Math.floor(validRating / 2);
    const halfStar = validRating % 2 >= 1;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    // Ensure fullStars and emptyStars are within valid range
    if (fullStars < 0 || emptyStars < 0 || fullStars > 5 || emptyStars > 5) {
        console.error(`Invalid star counts: fullStars=${fullStars}, emptyStars=${emptyStars}`);
        return null;
    }

    return (
        <>
            {Array(fullStars)
                .fill(null)
                .map((_, i) => (
                    <FaStar key={`full-${i}`} className="text-yellow-400" />
                ))}
            {halfStar && <FaStarHalfAlt className="text-yellow-400" />}
            {Array(emptyStars)
                .fill(null)
                .map((_, i) => (
                    <FaRegStar key={`empty-${i}`} className="text-yellow-400" />
                ))}
        </>
    );
};

