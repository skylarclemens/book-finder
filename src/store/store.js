import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../reducers/bookReducer";
import userReducer from "../reducers/userReducer";

const preloadedState = localStorage.getItem("localState") ? JSON.parse(localStorage.getItem("localState")) : {};

export const store = configureStore({
  reducer: {
    books: bookReducer,
    user: userReducer
  },
  preloadedState
})

store.subscribe(() => {
  localStorage.setItem("localState", JSON.stringify(store.getState()));
})