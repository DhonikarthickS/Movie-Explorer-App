import "../css/Modal.css";

function MovieInfoModal({ data, setIsOpen }) {
  if (!data) return null;

  const processedLink = data.trailer?.replace("watch?v=", "embed/");

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="info-modal" tabIndex={0}>
        <div className="modal-header">
          <h1 className="modal-title">{data.title}</h1>
          <button
            className="modal-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close modal"
            title="Close"
          >
            ✕
          </button>
        </div>

        <div className="modal-content">
          {processedLink && (
            <div className="video-container">
              <iframe
                src={processedLink}
                title={`${data.title} trailer`}
                allowFullScreen
              />
            </div>
          )}

          {data.plot_overview && (
            <p className="modal-description">{data.plot_overview}</p>
          )}

          {data.user_rating && (
            <div className="modal-rating">
              <div className="rating-score">{data.user_rating}</div>
              <div className="rating-text">/10</div>
              <div className="rating-stars">
                {"★".repeat(Math.floor(data.user_rating / 2))}
                {"☆".repeat(5 - Math.floor(data.user_rating / 2))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieInfoModal;
