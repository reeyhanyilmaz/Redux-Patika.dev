import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//async işlemde middleware gerekli burada thunk kullandık. action'ı bekletebilmek için.
//async işlemi ismi ilk kısım ikinci kısım API çekme işlemi kısmı. native veriyi fetch ile aldık sonra response ile sonucu döndük.
// export const getTodoAsync = createAsyncThunk("todos/getTodoAsync", async () => {
//   const response = await fetch("http://localhost:7000/todos");
//   return await response.json();
// });

//axios ile
export const getTodoAsync = createAsyncThunk("todos/getTodoAsync", async () => {
    const response = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`);
    return response.data;
  });
  
  export const addTodoAsync = createAsyncThunk("todos/addTodoAsync", async (data) => {
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`, data);
      //aslında burada data title. Post body'de ki. Göndermek istediğimiz.
      return response.data;
    }
  );
  
  export const toggleTodoAsync = createAsyncThunk("todos/toggleTodoAsync", async ({ id, data }) => {
      //data ile true false gelecek. patch ile düzenleme yapılır backend'de (postman).
      const response = await axios.patch(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`, data);
      return response.data;
    }
  );
  
  export const removeTodoAsync = createAsyncThunk("todos/removeTodoAsync", async (id) => {
      await axios.delete(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`);
      return id; // direk silinen id'yi bilmek icin böyle yazdık.
    }
  );

  // export const removeItemAsync = createAsyncThunk("todos/removeItemAsync", async (id) => {
  //     await axios.delete(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`);
  //     return id;
  //   }
  // );