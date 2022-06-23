import {useState} from 'react';
import {useDispatch} from "react-redux";
import {addContact, addContacts} from "../../redux/contactSlice";
import {nanoid} from "@reduxjs/toolkit";

function Form() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
      e.preventDefault(); //native davranışı engelliyoruz, submit olunca sayfanın yenilenmesini engellemek icin.
    //   console.log("saASa") ; //submit olduğunu console'dan kontrol ettim.

    if(!name || !number) return false; //name yoksa çalışma. validation işlemi.

    // const names = name.split(",");
    // names.forEach((name) =>  dispatch(addContact({id: nanoid(), name})));

    // const data = names.map((name) => ({id: nanoid(), name}));
    // dispatch(addContacts(data)); 

    dispatch(addContact({id: nanoid(), name, phone_number: number})); 
    //verilen parametlerelerde ne varsa state üzerindeki entities altına geçer.
    
    setName("");//input boşaltmak için
    setNumber(""); 
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input placeholder='name' value={name} onChange={(e) => setName(e.target.value)}/>
            <input placeholder='phone number' value={number} onChange={(e) => setNumber(e.target.value)}/>
            <div className="btn">
              <button type='submit'> ADD  </button>
            </div>          
        </form>
    </div>
  )
}

export default Form;