import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../reducers/bookReducer";

const preloadedState = localStorage.getItem("userBooks") ? JSON.parse(localStorage.getItem("userBooks")) : {};

export const store = configureStore({
  reducer: {
    books: bookReducer
  },
  preloadedState
})

store.subscribe(() => {
  localStorage.setItem("userBooks", JSON.stringify(store.getState()));
})