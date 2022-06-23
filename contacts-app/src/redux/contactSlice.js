import {createSlice, createEntityAdapter} from "@reduxjs/toolkit";

export const contactAdapter = createEntityAdapter();

const initialState = contactAdapter.getInitialState();

export const contactSelector = contactAdapter.getSelectors(state => state.contacts );


const contactSlice = createSlice({
    name: "contacts",
    initialState,

    //reducers altındakiler action'larımız.
    reducers: {
        addContact: contactAdapter.addOne, //addOne entityAdapter ile geliyor.
        addContacts: contactAdapter.addMany, //birden fazla ekleme yapmak için.
        deleteContact: contactAdapter.removeOne, //tek birini silmek için.
        removeAllContacts: contactAdapter.removeAll,
    },
 
})

export const {addContact, addContacts, deleteContact, removeAllContacts } = contactSlice.actions;
export default contactSlice.reducer;