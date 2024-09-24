import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let detailsAction = createAsyncThunk(
  "movies/getOne",
  async ({ id, language = "en" }) => {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: {
        api_key: "879c6a542c95ace09e3ee4133eb03db8",
        language: language,
      },
    });
    return res.data;
  }
);

const detailsSlice = createSlice({
  name: "details",
  initialState: {
    details: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(detailsAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(detailsAction.fulfilled, (state, action) => {
      state.details = action.payload;
      state.loading = false;
    });

    builder.addCase(detailsAction.rejected, (state) => {
      state.error = "try again later";
    });
  },
});

export default detailsSlice.reducer;
