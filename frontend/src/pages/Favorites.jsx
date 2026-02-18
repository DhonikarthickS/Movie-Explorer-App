import "../css/Favorites.css";
import { useMovieContext } from "../context/MovieContext";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites.length > 0) {
    return (
      <div className="favorites">
        <div className="favorites-header">
          <h2>Your Favorites</h2>
          <p className="favorites-count">
            {favorites.length} movie{favorites.length !== 1 ? "s" : ""} in your
            collection
          </p>
        </div>
        <div className="movie-grid">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites">
      <div className="favorites-empty">
        <div className="empty-icon">🎬</div>
        <h2>No Favorite Movies Yet</h2>
        <p>
          Start adding movies to your favorites and they will appear here.
          Discover amazing films and build your personal collection!
        </p>
        <Link to="/Movie-Explorer-App" className="browse-button">
          <span>🔍</span>
          Browse Movies
        </Link>
      </div>
    </div>
  );
}

export default Favorites;
