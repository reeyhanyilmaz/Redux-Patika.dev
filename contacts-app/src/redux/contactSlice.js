import {createSlice, createEntityAdapter} from "@reduxjs/toolkit";

export const contactAdapter = createEntityAdapter();

const initialState = contactAdapter.getInitialState();

export const contactSlice = createSlice({
    name: "contacts",
    initialState,
    //reducers altındakiler action'larımız.
    reducers: {
        addContact: contactAdapter.addOne, //addOne entityAdapter ile geliyor.
    },
 
})

export const {addContact} = contactSlice.actions;
export default contactSlice.reducer;