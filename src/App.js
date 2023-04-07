import "./App.css";
import SearchIcon from "./search.svg";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const App = () => {
  const API_URL = "http://www.omdbapi.com?apikey=3fc086f4";
  const [movies, setMovies] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  console.log("API_URL" + API_URL);

  const searchMovie = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log(data.Search);
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovie(searchItem);
  }, []);

  return (
    <div className="app">
      <h1>Movie Mania</h1>
      <div className="search">
        <input
          placeholder="search for movie"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          onKeyPress={() => searchMovie(searchItem)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovie(searchItem)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
