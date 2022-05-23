import { useState } from "react";
import { useDispatch } from "react-redux"; 
import { addTodo } from "../redux/todos/todosSlice"; 
import { nanoid } from '@reduxjs/toolkit'; //unique id olusturmak icin yazdık.

function Form() {
  const dispatch = useDispatch(); //store'da dispatch yapmak icin.
  const [title, setTitle] = useState(""); //inputtaki itemsları alıp addTodo'ya gönderebilmemiz iicn state yazdık.
  
  const handleSubmit = (e) => {
    e.preventDefault(); //items girip enter yapınca (submit olması) sayfa yenilenmesini engellemesi icin.

    if(!title) return; //title boş ise return et. Boş ekleme yapmasını engelle.

    // dispatch(addTodo({id: nanoid() , title , completed: false})); //dispatch edilen action'i store'a gonder.
    dispatch(addTodo({title }));//title dispatch edilince title payload olarak gönderiliyor. Slice'da prepare'e düşer. Sonra return edilir. reducer'daki aciton içerisine düşer. action altındaki payload ile de state elemanı eklenir.

    setTitle(""); //formu bosalt.
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  );
}

export default Form;
