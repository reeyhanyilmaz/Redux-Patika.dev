import { createSlice, nanoid } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [
      {
        id: 1,
        title: "Learn React",
        completed: true,
      },
      {
        id: 2,
        title: "Learn Redux",
        completed: false,
      },
    ],
    activeFilter: "all",
  },

  reducers: {
    // addTodo: (state, action) => {
    //   state.items.push(action.payload);
    // },

    addTodo: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      //prepare ile reducers state'i değiştirmeden önce ona gelecek olan payload'u yapılandırabiliyoruz.
      prepare: ({ title }) => {
        return {
          payload: {
            id: nanoid(),
            completed: false,
            title,
          },
        };
      },
    },

    toggle: (state, action) => {
      const { id } = action.payload; //id'ye göre item'i bul.
      const item = state.items.find((item) => item.id === id);
      item.completed = !item.completed; //tersini alır burada.
    },
    destroy: (state, action) => {
      const id = action.payload; //obje olarak değil doğrudan parametre olarak payload'da id gönderdik burada.
      const filtered = state.items.filter((item) => item.id !== id);
      //silinmek istenen id'li eleman hariç topluyoruz. item.id denk değilse id'ye filtre  icine eklenecek.
      state.items = filtered;
    },
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      const filtered = state.items.filter((item) => item.completed === false); //tamamlanmamış olanları getir.
      state.items = filtered;
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
