import { useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";
import {changeActiveFilter , clearCompleted , selectTodos , selectActiveFilter} from "../redux/todos/todosSlice";
import { removeItemAsync } from "../redux/todos/services";

function ContentFooter() {
  const dispatch = useDispatch(); //action dispatch edicez.
  const items = useSelector(selectTodos);
  const itemsLeft = items.filter((item) => !item.completed).length; // completed olmayan item sayısını verecek.

  // const activeFilter = useSelector((state) => state.todos.activeFilter); 
  const activeFilter = useSelector(selectActiveFilter); //slice'da tanımlayıp buraya çektik.activeFilter : all, completed, active'ler oluyor.

  useEffect(() => {
    localStorage.setItem("activeFilter", activeFilter);
  }, [activeFilter]);

  // const handleDestroyAll = () => {
  //   if (window.confirm("Are you sure?")) {
  //     const completedItems = items.filter((item) => item.completed === true);
  //     completedItems.forEach(async (element) => {
  //       await dispatch(removeItemAsync(element.id));
  //     });
  //   }
  // };

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{itemsLeft}</strong> item{itemsLeft > 1 && "s"} left
      </span>
      <ul className="filters">
        <li>
          <a href="#/" className={activeFilter === "all" ? "selected" : ""} 
          onClick={() => dispatch(changeActiveFilter("all"))}>
            All
          </a>
        </li>
        <li>
          <a href="#/" className={activeFilter === "active" ? "selected" : ""}
          onClick={() => dispatch(changeActiveFilter("active"))}>Active</a>
        </li>
        <li>
          <a href="#/" className={activeFilter === "completed" ? "selected" : ""}
          onClick={() => dispatch(changeActiveFilter("completed"))}>Completed</a>
        </li>
      </ul>
      <button className="clear-completed"
      //gelen action'ı dispatch ediyoruz. Herhangi bir payload göndermiyoruz.
      // onClick={handleDestroyAll}
      onClick={() => dispatch(clearCompleted())}
      >Clear completed</button>
    </footer>
  );
}

export default ContentFooter;
