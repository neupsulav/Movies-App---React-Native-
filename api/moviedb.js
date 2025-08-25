import axios from "axios";
import { API_KEY } from "@env";

const apiKey = API_KEY;

// endpoints
const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingMovieEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMovieEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;

// movie details endpoint
const movieDetailsEndpoint = (id) => {
  return `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
};

// movie cast endpoint
const movieCreditsEndpoint = (id) => {
  return `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
};

// similar movies endpoint
const similarMoviesEndpoint = (id) => {
  return `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;
};

// person detail
const personDetailEndpoint = (id) => {
  return `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
};

// person movies endpoint
const personMoviesEndpoint = (id) => {
  return `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;
};

// search endpoint
const searchMoviesEndpoint = () => {
  return `${apiBaseUrl}/search/movie?api_key=${apiKey}`;
};

// for image of size 500
export const image500 = (path) => {
  return path ? `https://image.tmdb.org/t/p/w500${path}` : null;
};

// for image of size 342
export const image342 = (path) => {
  return path ? `https://image.tmdb.org/t/p/w342${path}` : null;
};

// for image of size 185
export const image185 = (path) => {
  return path ? `https://image.tmdb.org/t/p/w185${path}` : null;
};

// fallback movie image url
export const fallbackMovieImage =
  "https://static.vecteezy.com/system/resources/previews/012/942/784/non_2x/broken-image-icon-isolated-on-a-white-background-no-image-symbol-for-web-and-mobile-apps-free-vector.jpg";

// fallback person image url
export const fallbackPersonImage =
  "https://i.pinimg.com/736x/9f/16/72/9f1672710cba6bcb0dfd93201c6d4c00.jpg";

// function for api call
const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error: " + error);
    return {};
  }
};

// function for trending movies
export const fetchTrendingMovies = () => {
  return apiCall(trendingMovieEndpoint);
};

// function for upcoming movies
export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMovieEndpoint);
};

// function for top rated movies
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint);
};

// function for movie details
export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEndpoint(id));
};

// function for movie cast details
export const fetchMovieCreditDetails = (id) => {
  return apiCall(movieCreditsEndpoint(id));
};

// function for similar movies
export const fetchSimilarMoviesDetails = (id) => {
  return apiCall(similarMoviesEndpoint(id));
};

// function for person details
export const fetchPersonDetails = (id) => {
  return apiCall(personDetailEndpoint(id));
};

// function for person movies
export const fetchPersonMovies = (id) => {
  return apiCall(personMoviesEndpoint(id));
};

// function to search movies
export const searchMovies = (params) => {
  return apiCall(searchMoviesEndpoint(), params);
};
