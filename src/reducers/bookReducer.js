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
    },
    removeBook(state, action) {
      const removeId = action.payload;
      return state.filter(book => book.id !== removeId)
    }
  }
})

export const { initializeBooks, appendBook, removeBook } = bookSlice.actions;

export default bookSlice.reducer;