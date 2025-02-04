import { useEffect } from "react";
import { useState } from "react";

export function useFetchMovie(query) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function getMovies() {
            const res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=a2e55271&s=${query}`);
            const data = await res.json();
            setMovies(data.Search);
        }
        if(query.length>2){
            getMovies();
        }

    }, [query])

    return movies ?? []
}