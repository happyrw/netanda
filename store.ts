import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "./services/TMDB";
import genreOrCategoryReducer from "./services/current-genre-or-category";

const store = configureStore({
    reducer: {
        [tmdbApi.reducerPath]: tmdbApi.reducer,
        currentGenreOrCategory: genreOrCategoryReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tmdbApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;