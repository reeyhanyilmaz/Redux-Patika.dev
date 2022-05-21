//slice bir bütünün parcası gibi düşünülebilir.

import { createSlice } from '@reduxjs/toolkit';//bizim icin slice olusturur.

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
    },
    reducers: { //state'i güncelleyecek (veriyi manipüle edecek) veriler reducer kısmına yazılır. Yani actions'larımız.
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            console.log("action:", action);
            state.value += Number(action.payload);
        },


    }
});


export const { increment, decrement, incrementByAmount } = counterSlice.actions; //actions ile reducer'ın içindeki fonksiyonları çağırıyoruz.
export default counterSlice.reducer;