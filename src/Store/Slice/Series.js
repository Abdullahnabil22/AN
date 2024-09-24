import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let seriesAction = createAsyncThunk(
  "movies/getAll",
  async ({ page = 1, language = "en" }) => {
    const res = await axios.get("https://api.themoviedb.org/3/tv/popular", {
      params: {
        api_key: "879c6a542c95ace09e3ee4133eb03db8",
        page: page,
        language: language,
      },
    });
    return res.data.results;
  }
);

const seriesSlice = createSlice({
  name: "series",
  initialState: {
    series: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(seriesAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(seriesAction.fulfilled, (state, action) => {
      state.series = action.payload;
      state.loading = false;
    });

    builder.addCase(seriesAction.rejected, (state) => {
      state.error = "try again later";
    });
  },
});

export default seriesSlice.reducer;
