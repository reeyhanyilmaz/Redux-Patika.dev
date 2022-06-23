import React from 'react'; 
import { useSelector } from 'react-redux';
import {contactSelector} from "../../redux/contactSlice";
import Item from "./Item"; 

function List() {
    const contacts = useSelector(contactSelector.selectAll); //selectAll array olarak tutar 
    console.log('contacts :>> ', contacts);

    // const total = useSelector(contactSelector.selectTotal); //kaç tane var o sayıyı döndürür  
    // console.log('total :>> ', total);
  return (
    <ul className='list'>
        {
            contacts.map(contact => <Item key={contact.id}  item={contact}/>)
        }
    </ul>
  )
}

export default List;