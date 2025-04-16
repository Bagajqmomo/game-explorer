import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "./features/games/gamesSlice";
import gameDetailsReducer from "./features/games/gameDetailsSlice";

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    gameDetails: gameDetailsReducer,
  },
});
