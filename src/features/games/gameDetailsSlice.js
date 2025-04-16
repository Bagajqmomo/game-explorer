import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGameDetails = createAsyncThunk(
  "gameDetails/fetchGameDetails",
  async (id) => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const response = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
    return response.data;
  }
);

const gameDetailsSlice = createSlice({
  name: "gameDetails",
  initialState: {
    item: null,
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGameDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGameDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.item = action.payload;
      })
      .addCase(fetchGameDetails.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default gameDetailsSlice.reducer;
