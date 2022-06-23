import {createSlice, createEntityAdapter} from "@reduxjs/toolkit";

export const contactAdapter = createEntityAdapter();

const initialState = contactAdapter.getInitialState();

export const contactSelector = contactAdapter.getSelectors(state => state.contacts );


const contactSlice = createSlice({
    name: "contacts",
    initialState,

    //reducers altındakiler action'larımız.
    reducers: {
        //entity ile find metodu ile tek tek array'i dönmesi yerine direk id'ye erişebiliyoruz bize hız kazandırır. 
        // entity bir object ve key olarak id tutuyor. 
        //code karmaşıklığının önüne geçer daha temiz bir kod yazdık verilen func. ile 
        addContact: contactAdapter.addOne, //addOne entityAdapter ile geliyor.
        addContacts: contactAdapter.addMany, //birden fazla ekleme yapmak için.
        deleteContact: contactAdapter.removeOne, //tek birini silmek için. 
        // diğer türlü array içinde filtreleme yapılacaktı ve array'in içinde her elemanı dönecekti.
        
        removeAllContacts: contactAdapter.removeAll,
        updateContact: contactAdapter.updateOne,
    },
 
})

export const {addContact, addContacts, deleteContact, removeAllContacts, updateContact } = contactSlice.actions;
export default contactSlice.reducer;