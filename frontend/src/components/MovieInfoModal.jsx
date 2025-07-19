import "../css/Home.css";

function MovieInfoModal({ data, setIsOpen }) {
  if (!data) return null;

  const processedLink = data.trailer?.replace("watch?v=", "embed/");

  return (
    <div className="info-modal">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>{data.title}</h1>
        <span
          style={{
            cursor: "pointer",
            fontSize: "32px",
            lineHeight: "1",
            marginLeft: "20px",
          }}
          title="Close"
          onClick={() => setIsOpen(false)}
        >
          &#10060;
        </span>
      </div>
      {processedLink && (
        <iframe width="700" height="550" src={processedLink}></iframe>
      )}
      <p>{data.plot_overview}</p>
      <h2>
        <span style={{ fontSize: "48px", fontWeight: "bold" }}>
          {data.user_rating}
        </span>
        /10
      </h2>
    </div>
  );
}

export default MovieInfoModal;
