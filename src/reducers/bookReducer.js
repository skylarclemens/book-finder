import { createSlice } from "@reduxjs/toolkit";

const initial = [
  {
    title:"The Dispossessed",
    subtitle:"An Ambiguous Utopia",
    description:"Shevek, a brilliant physicist, decides to take action. He will seek answers, question the unquestionable, and attempt to tear down the walls of hatred that have isolated his planet of anarchists from the rest of the civilized universe. To do this dangerous task will mean giving up his family and possibly his life. Shevek must make the unprecedented journey to the utopian mother planet, Anarres, to challenge the complex structures of life and living, and ignite the fires of change.",
    publisher:"EOS",
    pageCount:387,
    image:"http://books.google.com/books/content?id=M45vPwAACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73yDbZN6cpS_YaXIPJe1tlKangEXrUpfg5KAIrhvePdoTuKlM9veLnFWkZiNqNHtYybvq2mD081vpjkxxuGsM6OiSmAejLDK_sz5DWXzOKLLs9Tg-qs0-vObE9tPrtVyGbSHY-h&source=gbs_api",
    isbn:"9780785764038"
  }
]

const bookSlice = createSlice({
  name: 'books',
  initialState: initial,
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