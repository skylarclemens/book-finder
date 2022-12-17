import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: 'books',
  initialState: [],
  reducers: {
    initializeBooks(state, action) {
      return action.payload;
    },
    appendBook(state, action) {
      return [...state, action.payload];
    }
  }
})

export const { initializeBooks, appendBook } = bookSlice.actions;

export default bookSlice.reducer;