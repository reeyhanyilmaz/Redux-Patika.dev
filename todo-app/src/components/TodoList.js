import React from "react";
import { useSelector , useDispatch } from "react-redux"; //storedaki initialState'lere ulaşabilmemizi sağlar.
import { toggle , destroy , selectTodos , selectFilteredTodos} from "../redux/todos/todosSlice";

// let filtered = []; //todo slice'da selector olusturduk bunu inactive ettik.

function TodoList() {
  const dispatch = useDispatch();
  const filteredTodos = useSelector(selectFilteredTodos);

   //todo slice'da selector olusturduk bunu inactive ettik*************************

  // const items = useSelector(selectTodos); //state'daki todos.items'i alır. Yani yazdığımız her bir todo item demek (todos altında her bir items todosSlice'dan gelen).

  // const activeFilter = useSelector((state) => state.todos.activeFilter);
 
  // filtered = items; //filtered doğrudan items'a eşit if'e girmeyecek yani (all).
  // if( activeFilter !== "all"){ //eger all secili degilse (active veya completed secili ise)
  //   filtered = items.filter((todo) => 
  //   activeFilter === "active" 
  //   ? todo.completed === false //active ise completed false olanları filtrele
  //   : todo.completed === true); 
  // }
 
  const handleDestroy = (id) => {
    if(window.confirm("Are you sure?")){
    dispatch(destroy(id));
    }    
  };

  console.log(filteredTodos);

  return (
    <ul className="todo-list">
      {filteredTodos.map((item) => (
        <li key={item.id} className={item.completed ? "completed" : ""}>
          <div className="view">
            <input className="toggle" type="checkbox" 
            checked={item.completed} //false olanları otomatik checked yapsın diye.
            onChange={() => dispatch(toggle({id: item.id}))}
            //toggle action dispatch etsin onChange olunca. id'yi payload icinde aldık.
            />
            <label>{item.title}</label>
            <button className="destroy" onClick={() => handleDestroy(item.id)}></button>
          </div>
        </li>
      ))}
    </ul>
  ); 
}

export default TodoList;
