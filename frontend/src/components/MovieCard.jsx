import "../css/MovieCard.css";
import { useMovieContext } from "../context/MovieContext";

function MovieCard({ movie, setSelectedData, setIsOpen }) {
  const fallbackImage = "https://via.placeholder.com/300x450?text=No+Image";
  const { isFavorites, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorites(movie.id);

  const handleFavorite = (e) => {
    e.stopPropagation();
    favorite ? removeFromFavorites(movie.id) : addToFavorites(movie);
  };

  const openModal = () => {
    if (setSelectedData) {
      setSelectedData(movie);
      setIsOpen(true);
    }
  };

  return (
    <div className="movie-card" onClick={openModal}>
      <div className="movie-poster">
        <img
          src={movie.image_url || fallbackImage}
          alt={movie.title || "Untitled"}
          onError={(e) => (e.target.src = fallbackImage)}
        />
        <div className="movie-overlay">
          <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={handleFavorite}>
            🤍
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.year || "Unknown Year"}</p>
        <p>{movie.plot_overview}</p>
      </div>
    </div>
  );
}

export default MovieCard;
