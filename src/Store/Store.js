import { configureStore } from "@reduxjs/toolkit";
import FavReducer from "./Slice/Fav";
import loggingReducer from "./Slice/Logging";
import movieReducer from "./Slice/Movies";
import seriesReducer from "./Slice/Series";
import detailsReducer from "./Slice/details";

export const Store = configureStore({
  reducer: {
    Fav: FavReducer,
    Log: loggingReducer,
    movie: movieReducer,
    series: seriesReducer,
    detail: detailsReducer,
  },
});
