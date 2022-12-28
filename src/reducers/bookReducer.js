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
      return state.filter(book => book.books.id !== removeId)
    },
    updateBook(state, action) {
      const updatedBook = action.payload;
      return state.map(book => book.books.id === updatedBook.books.id ? updatedBook : book);
    },
    resetBooks() {
      return [];
    }
  }
})

export const { initializeBooks, appendBook, removeBook, updateBook, resetBooks } = bookSlice.actions;

export default bookSlice.reducer;