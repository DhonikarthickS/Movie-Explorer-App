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
    getPopularMovies()
      .then(setMovies)
      .catch(() => setError("Failed"))
      .finally(() => setLoading(false));
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

  const renderSkeletonCards = () => {
    return Array.from({ length: 8 }, (_, index) => (
      <div key={index} className="skeleton-card">
        <div className="skeleton-poster"></div>
        <div className="skeleton-content">
          <div className="skeleton-title"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
          <div className="skeleton-text"></div>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="home">
        <div className="hero-section">
          <h1 className="hero-title">Discover Amazing Movies</h1>
          <p className="hero-subtitle">
            Explore thousands of movies, create your personal favorites
            collection, and never miss a great film again.
          </p>
        </div>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for movies..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading amazing movies...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <p className="error-message">Oops! Something went wrong</p>
            <p className="error-description">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="search-button"
            >
              Try Again
            </button>
          </div>
        )}

        {loading ? (
          <div className="skeleton-grid">{renderSkeletonCards()}</div>
        ) : (
          !error && (
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
          )
        )}
      </div>

      {isOpen && <MovieInfoModal data={selectedData} setIsOpen={setIsOpen} />}
    </>
  );
}

export default Home;
