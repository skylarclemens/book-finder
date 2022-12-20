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
    },
    updateBook(state, action) {
      const updatedBook = action.payload;
      return state.map(book => book.id === updatedBook.id ? updatedBook : book);
    }
  }
})

export const { initializeBooks, appendBook, removeBook, updateBook } = bookSlice.actions;

export default bookSlice.reducer;