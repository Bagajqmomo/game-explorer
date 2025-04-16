import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const url = "/api/games";

// Define the async thunk for fetching games
export const fetchGames = createAsyncThunk(
  "games/fetchGames",
  async ({ search = "", page = 1, fullUrl = null }) => {
    const apiUrl = fullUrl
      ? fullUrl
      : `/api/games?key=${API_KEY}&search=${search}&page=${page}`;

    const res = await axios.get(apiUrl);

    // Extract current page from URL if possible
    let currentPage = 1;
    try {
      const urlObj = new URL(apiUrl, window.location.origin);
      currentPage = parseInt(urlObj.searchParams.get("page")) || 1;
    } catch (error) {
      console.warn("Could not parse current page:", error);
    }

    console.log(res.data);

    return {
      results: res.data.results,
      next: res.data.next,
      previous: res.data.previous,
      currentPage,
    };
  }
);

const gamesSlice = createSlice({
  name: "games",
  initialState: {
    items: [],
    status: "idle",
    nextPageUrl: null,
    prevPageUrl: null,
    currentPage: 1, // Start from page 1
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.results;
        state.nextPageUrl = action.payload.next;
        state.prevPageUrl = action.payload.previous;
        state.currentPage = action.payload.currentPage; // Update currentPage
      })
      .addCase(fetchGames.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default gamesSlice.reducer;
