import { createSlice } from "@reduxjs/toolkit";

const LoggingSlice = createSlice({
  name: "logging",
  initialState: {
    isLogging: false,
  },
  reducers: {
    toggleLogging(state, action) {
      state.isLogging = action.payload;
    },
  },
});

export const { toggleLogging } = LoggingSlice.actions;

export default LoggingSlice.reducer;
