import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie",
  params: { api_key: "879c6a542c95ace09e3ee4133eb03db8" },
});
