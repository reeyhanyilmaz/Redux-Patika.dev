import {axios }from 'axios';
import {createSlice ,createAsyncThunk} from "@reduxjs/toolkit";

export const fetchCharacters = createAsyncThunk("characters/getCharacters" , async () => {
    const res = await axios(`${process.env.REACT_APP_API_ENDPOINT}/characters?limit=10`);
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
            console.log("action.payload", action.payload);
        }

    }
}) 

export default charactersSlice.reducer;