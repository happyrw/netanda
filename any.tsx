export const fetchFromApi = async (category: string) => {
    const url = `https://imdb8.p.rapidapi.com/auto-complete?q=${category}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '482f608cc6msh68a3e3a03429698p1d8967jsnc092a4c4ee89',
            'x-rapidapi-host': 'imdb8.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
};

{/*
    
    const API_URL = "http://www.omdbapi.com?apikey=96399b22";

  useEffect(() => {
    const searchMovies = async (title: string) => {
      try {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        if (data.Response === "True") {
          setMovies(data.Search);
          console.log("action", data.Search);
        } else {
          setMovies([]);
          console.log("No movies found");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      }
    };

    if (selectedCategory) {
      searchMovies(selectedCategory);
    }
  }, [selectedCategory]);


  // useEffect(() => {
  //   const getMovies = async () => {
  //     setLoading(true);
  //     const data = await fetchFromApi(selectedCategory);
  //     if (data && data.d) {
  //       setMovies(data.d);
  //       console.log("movies fetched", data.d);
  //     } else {
  //       setMovies([]);
  //       console.log("no movies");
  //     }
  //     setLoading(false);
  //   };

  //   getMovies();
  // }, [selectedCategory]);

  // useEffect(() => {
  //   console.log("movies state updated", movies);
  // }, [movies]);





    */}
