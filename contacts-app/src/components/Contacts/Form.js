import {useState} from 'react';
import {useDispatch} from "react-redux";
import {addContact, addContacts} from "../../redux/contactSlice";
import {nanoid} from "@reduxjs/toolkit";

function Form() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
      e.preventDefault(); //native davranışı engelliyoruz, submit olunca sayfanın yenilenmesini engellemek icin.
    //   console.log("saASa") ; //submit olduğunu console'dan kontrol ettim.

    if(!name) return false; //name yoksa çalışma.

    // const names = name.split(",");
    // names.forEach((name) =>  dispatch(addContact({id: nanoid(), name})));

    // const data = names.map((name) => ({id: nanoid(), name}));
    // dispatch(addContacts(data)); 
    
    dispatch(addContact({id: nanoid(), name}));
    setName("");//input boşaltmak için
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input placeholder='name' value={name} onChange={(e) => setName(e.target.value)}/>
        </form>
    </div>
  )
}

export default Form;