// import axios from "axios";

// const tmdbApiKey = 1;
// const page = 1;

// export async function fetchMoviesFromApi(selectedCategory: string) {
//     const url = `https://api.themoviedb.org/3/movie/${selectedCategory}?page=${page}&api_key=${tmdbApiKey}`;
//     try {
//         const response = await axios.get(url);
//         const data = response.data.results;
//         return data;
//     } catch (error) {
//         console.error("Error fetching data: ", error);
//         return [];
//     }
// };

// export async function fetchMoviesByGenres(selectedCategory: string) {
//     const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${tmdbApiKey}`;
//     try {
//         const response = await axios.get(url);
//         const data = response.data.results;
//         return data;
//     } catch (error) {
//         console.error("Error fetching data: ", error);
//         return [];
//     }
// };
