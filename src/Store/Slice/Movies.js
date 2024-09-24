import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let moviesAction = createAsyncThunk(
  "movies/getAll",
  async ({ page = 1, language = "en" }) => {
    const res = await axios.get("https://api.themoviedb.org/3/movie/popular", {
      params: {
        api_key: "879c6a542c95ace09e3ee4133eb03db8",
        page: page,
        language: language,
      },
    });
    return res.data.results;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(moviesAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(moviesAction.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.loading = false;
    });

    builder.addCase(moviesAction.rejected, (state) => {
      state.error = "try again later";
    });
  },
});

export default movieSlice.reducer;
