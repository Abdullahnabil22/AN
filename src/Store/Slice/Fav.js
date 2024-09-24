import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  const storedFavMovies = localStorage.getItem("favMovies");
  return storedFavMovies ? JSON.parse(storedFavMovies) : [];
};

const saveToLocalStorage = (favMovies) => {
  localStorage.setItem("favMovies", JSON.stringify(favMovies));
};

const FavSlice = createSlice({
  name: "fav",
  initialState: {
    favMovies: loadFromLocalStorage(),
  },
  reducers: {
    addFav(state, action) {
      const exists = state.favMovies.some(
        (movie) => movie.id === action.payload.id
      );

      if (!exists) {
        state.favMovies.push(action.payload);
        saveToLocalStorage(state.favMovies);
      }
    },
    removeFav(state, action) {
      const index = state.favMovies.findIndex(
        (movie) => movie.id === action.payload.id
      );
      if (index !== -1) {
        state.favMovies.splice(index, 1);
        saveToLocalStorage(state.favMovies);
      }
    },
  },
});

export const { addFav, removeFav } = FavSlice.actions;

export default FavSlice.reducer;
