import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const char_limit = 12;
export const fetchCharacters = createAsyncThunk("characters/getCharacters", async (page) => {
    const res = await axios(`${process.env.REACT_APP_API_ENDPOINT}/characters?limit=${char_limit}&offset=${page * char_limit}`);
    return res.data;
  }
);

export const charactersSlice = createSlice({
  //bunu store.js' dahil edicez.
  name: "characters", //dosyanın ismi.
  initialState: {
    items: [],
    isLoading: false,
    page:0,
    hasNextPage: true,
  },
  reducers: {},

  //async actionları buraya yazıyoruz.
  extraReducers: {
    [fetchCharacters.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchCharacters.fulfilled]: (state, action) => {
      // state.items = action.payload;
      state.items = [...state.items, ...action.payload]; //sayfa yüklediğimizde önceki sayfadaki elemanları da göstersin diye.
      state.isLoading = false;
      state.page +=1; //sayfa numarasını arttırmak için.

      if(action.payload.length<12){
        state.hasNextPage=false;
       }

      console.log("action.payload", action.payload); //action.payload bizim objelerimiz oldu (karakter ve bilgilerini içeren).
    },
      
    [fetchCharacters.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
  },
});

export default charactersSlice.reducer;
