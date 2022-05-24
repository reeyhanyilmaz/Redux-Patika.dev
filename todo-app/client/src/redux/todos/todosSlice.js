import { createSlice, nanoid } from "@reduxjs/toolkit";
import { getTodoAsync, addTodoAsync, toggleTodoAsync, removeTodoAsync} from "./services";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [
      // {
      //   id: 1,
      //   title: "Learn React",
      //   completed: true,
      // },
      // {
      //   id: 2,
      //   title: "Learn Redux",
      //   completed: false,
      // },
    ],
    isLoading: false,
    error: null,
    // activeFilter: "all",  
    activeFilter: localStorage.getItem("activeFilter"), //sayfa yenilenince hangi filtredeysek onu verir direk bize localStorage'dan alacak.

    // addNewTodo: {
    //   isLoading: false,
    //   error: false,
    //   //alttakileri daha düzenli toparlayarak yazmak icin. addNewTodo.isLoading veya addNewTodo.error ekleyebiliriz ardından Form.js'de (componnet tarafında) deassNewTodo.isLoading gibi düzenlemek gerekir. Ben değiştirmedim, yapılabileceğini ekledim.
    // },
    addNewTodoLoading: false,
    addNewTodoError: null,    
  },
  reducers: {
    // addTodo: (state, action) => {
    //   state.items.push(action.payload);
    // },

    //id ve completed API'dan geldiği için buna gerek kalmadı artık.**********************************
    // addTodo: {
    //   reducer: (state, action) => {
    //     state.items.push(action.payload);
    //   },
    //   //prepare ile reducers state'i değiştirmeden önce ona gelecek olan payload'u yapılandırabiliyoruz.
    //   prepare: ({ title }) => {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         completed: false,
    //         title,
    //       },
    //     };
    //   },
    // },

    //backend'den çekeceğimiz için burayı iptal ettik. local kullanım için burayı yazmıştık**************
    // toggle: (state, action) => {
    //   const { id } = action.payload; //id'ye göre item'i bul.
    //   const item = state.items.find((item) => item.id === id);
    //   item.completed = !item.completed; //tersini alır burada.
    // },

    // destroy: (state, action) => {
    //   const id = action.payload; //obje olarak değil doğrudan parametre olarak payload'da id gönderdik burada.
    //   const filtered = state.items.filter((item) => item.id !== id);
    //   //silinmek istenen id'li eleman hariç topluyoruz. item.id denk değilse id'ye filtre  icine eklenecek.
    //   state.items = filtered;
    // },
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      const filtered = state.items.filter((item) => item.completed === false); //tamamlanmamış olanları getir.
      state.items = filtered;
    },
  },

  //API icin yazdık bunu (backend).
  extraReducers: {
    //get todos
    [getTodoAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTodoAsync.fulfilled]: (state, action) => {
      state.isLoading = false; //işlem tamamlanınca false, loading ekrandan kaybolsun.
      state.items = action.payload;
    },
    [getTodoAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },

    //add todo
    [addTodoAsync.pending]: (state, action) => {
      state.addNewTodoLoading = true;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.addNewTodoLoading = false;
      state.items.push(action.payload);
    },
    [addTodoAsync.rejected]: (state, action) => {
      state.addNewTodoLoading = false;
      state.addNewTodoError = action.error.message;
    },

    //toggle todo
    [toggleTodoAsync.fulfilled]: (state, action) => {
      const { id, completed } = action.payload;
      console.log("action.payload: ", action.payload);
      const index = state.items.findIndex((item) => item.id === id);
      //array index'i aldık. item.id denk action.payload'dan gelen id.

      state.items[index].completed = completed;
      //o index'e ait elemanın completed tanımını API'dan dönen completed tanımı ile değiştir.
    },

    //remove todo
    [removeTodoAsync.fulfilled]: (state, action) => {
      // 1.yöntem**************************************************
      // const id = action.payload; 
      // const filtered = state.items.filter((item) => item.id !== id);
      // state.items = filtered;

      // 2.yöntem**************************************************
      const id = action.payload; 
      const index = state.items.findIndex((item) => item.id === id);
      state.items.splice(index, 1); //bu indisten sonra 1 eleman sil, yani kendisi oluyor.
    },
  },
});

export const selectTodos = (state) => state.todos.items;
export const selectFilteredTodos = (state) => {
  if (state.todos.activeFilter === "all") {
    return state.todos.items;
  }

  return state.todos.items.filter((todo) =>
    state.todos.activeFilter === "active"
      ? todo.completed === false
      : todo.completed === true
  );
};

export const selectActiveFilter = (state) => state.todos.activeFilter;

export const { addTodo, toggle, destroy, changeActiveFilter, clearCompleted } =
  todosSlice.actions;
export default todosSlice.reducer; //store'da import edip reducer field'a verebilmek icin.
