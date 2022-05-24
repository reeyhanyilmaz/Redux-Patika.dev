import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, addTodoAsync } from "../redux/todos/services";
// import { nanoid } from "@reduxjs/toolkit"; //unique id olusturmak icin yazdık.
import Loading from "./Loading";
import Error from "./Error";

function Form() {
  const dispatch = useDispatch(); //store'da dispatch yapmak icin.
  const [title, setTitle] = useState(""); //inputtaki itemsları alıp addTodo'ya gönderebilmemiz icin state yazdık.

  const isLoading = useSelector((state) => state.todos.addNewTodoLoading);
  const error = useSelector((state) => state.todos.addNewTodoError);

  const handleSubmit = async (e) => {
    e.preventDefault(); //items girip enter yapınca (submit olması) sayfa yenilenmesini engellemesi icin.

    if (!title) return; //title boş ise return et. Boş ekleme yapmasını engelle.

    // dispatch(addTodo({id: nanoid() , title , completed: false})); //dispatch edilen action'i store'a gonder.
    // dispatch(addTodo({title }));//title dispatch edilince title payload olarak gönderiliyor. Slice'da prepare'e düşer. Sonra return edilir. reducer'daki aciton içerisine düşer. action altındaki payload ile de state elemanı eklenir.

    //backend bağlantısı ile eklenecek olan todo için yazdık.
    await dispatch(addTodoAsync({ title })); // async işlem o yüzden await ile bekletiyoruz.
    setTitle(""); //formu bosalt.
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", alignItems: "center" }}
    >
      <input
        disabled={isLoading} //loading ise input girişi yok.
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {isLoading && <Loading />}
      {error && <Error message={error} />}
    </form>
  );
}

export default Form;
