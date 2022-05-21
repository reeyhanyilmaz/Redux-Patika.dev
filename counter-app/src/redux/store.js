import { configureStore} from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';

//React context gibi state yönetimi yapıyoruz.
export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
});