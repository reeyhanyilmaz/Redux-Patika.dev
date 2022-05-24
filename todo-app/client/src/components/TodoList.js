import { useEffect } from "react";
import { useSelector , useDispatch } from "react-redux"; //storedaki initialState'lere ulaşabilmemizi sağlar.
import { toggle , destroy , selectTodos , getTodoAsync , toggleTodoAsync , removeTodoAsync} from "../redux/todos/services";
import { selectFilteredTodos } from "../redux/todos/todosSlice";
import Loading  from "./Loading";
import Error from "./Error";


// let filtered = []; //todo slice'da selector olusturduk bunu inactive ettik.

function TodoList() {
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

  const dispatch = useDispatch();
  const filteredTodos = useSelector(selectFilteredTodos);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    //component mount oldugu anda dispatch ediyoruz. getTodoAsync burada action oluyor.
    dispatch(getTodoAsync());
  }, [dispatch]);

  const handleDestroy = async  (id) => {
    if(window.confirm("Are you sure?")){
    // dispatch(destroy(id));

    //backend ile. async ve await'de ekledik.
    await dispatch(removeTodoAsync(id))
    }    
  };

  const handleToggle = async (id, completed) => {
   await dispatch(toggleTodoAsync({id, data : {completed}}));
  };
  
  console.log(filteredTodos);

  if(isLoading){
    return <Loading />
  }

  if(error){
    return <Error message={error} />
  }

  return (
    <ul className="todo-list">
      {filteredTodos.map((item) => (
        <li key={item.id} className={item.completed ? "completed" : ""}>
          <div className="view">
            <input className="toggle" type="checkbox" 
            checked={item.completed} //false olanları otomatik checked yapsın diye.
            // onChange={() => dispatch(toggle({id: item.id}))}
            //toggle action dispatch etsin onChange olunca. id'yi payload icinde aldık.

            //backend ile olusturulan. item.completed o anki halini gönderir. ! ise true ise false, false true yapar. 
            onChange={() => handleToggle(item.id, !item.completed)}

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
