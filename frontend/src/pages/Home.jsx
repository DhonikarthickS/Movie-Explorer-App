import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";
import MovieInfoModal from "../components/MovieInfoModal";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedData, setSelectedData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getPopularMovies().then(setMovies).catch(() => setError("Failed")).finally(() => setLoading(false));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const result = await searchMovies(searchQuery);
      setMovies(result);
    } catch {
      setError("Search failed.");
    } finally {
      setLoading(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <div className="home">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for movies..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">Search</button>
        </form>

        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}

        <div className="movies-grid">
          {movies.map((movie, index) => (
            <MovieCard
              key={movie.id || index}
              movie={movie}
              setSelectedData={setSelectedData}
              setIsOpen={setIsOpen}
            />
          ))}
        </div>
      </div>

      {isOpen && <MovieInfoModal data={selectedData} setIsOpen={setIsOpen} />}
    </>
  );
}

export default Home;
