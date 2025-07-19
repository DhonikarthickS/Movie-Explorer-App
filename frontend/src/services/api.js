const API_KEY = "uu3pWSaX0cmDrOvJYGP8FOvm4csumZCv6ds8XALv";
const BASE_URL = "https://api.watchmode.com/v1";

export const getPopularMovies = async () => {
  try {
    const listResponse = await fetch(
      `${BASE_URL}/list-titles?apiKey=${API_KEY}&types=movie&sort_by=popularity_desc&limit=25`
    );
    const listData = await listResponse.json();
    const movies = listData.titles || [];

    const detailedMovies = await Promise.all(
      movies.map(async (movie) => {
        const detailRes = await fetch(
          `${BASE_URL}/title/${movie.id}/details/?apiKey=${API_KEY}`
        );
        const detailData = await detailRes.json();
        return {
          ...movie,
          image_url: detailData.poster,
          year: detailData.year,
          title: detailData.title,
          plot_overview: detailData.plot_overview,
          trailer: detailData.trailer,
          user_rating: detailData.user_rating,
        };
      })
    );

    return detailedMovies;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/?apiKey=${API_KEY}&search_field=name&search_value=${encodeURIComponent(
        query
      )}`
    );
    const data = await response.json();
    const results = data.title_results || [];

    const detailedMovies = await Promise.all(
      results.map(async (movie) => {
        const detailRes = await fetch(
          `${BASE_URL}/title/${movie.id}/details/?apiKey=${API_KEY}`
        );
        const detailData = await detailRes.json();
        return {
          ...movie,
          image_url: detailData.poster,
          year: detailData.year,
          title: detailData.title,
          plot_overview: detailData.plot_overview,
          trailer: detailData.trailer,
          user_rating: detailData.user_rating,
        };
      })
    );

    return detailedMovies;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};
