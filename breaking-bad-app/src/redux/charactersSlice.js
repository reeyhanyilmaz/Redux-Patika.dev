import axios from 'axios';
import {createSlice ,createAsyncThunk} from "@reduxjs/toolkit";


const char_limit= 12;
export const fetchCharacters = createAsyncThunk("characters/getCharacters" , async () => {
    const res = await axios(`${process.env.REACT_APP_API_ENDPOINT}/characters?limit=${char_limit}`);
    return res.data;
})

export const charactersSlice = createSlice({ //bunu store.js' dahil edicez.
    name: "characters",//dosyanın ismi.
    initialState: {
        items: [],
    },
    reducers: {},

    //async actionları buraya yazıyoruz.
    extraReducers: {
        [fetchCharacters.fulfilled]: (state, action) => {
            state.items = action.payload;
            console.log("action.payload", action.payload); 
            //action.payload bizim objelerimiz oldu (karakter ve bilgilerini içeren).
        }

    }
}) 

export default charactersSlice.reducer;