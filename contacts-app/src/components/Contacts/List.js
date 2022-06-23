import React from 'react'; 
import { useSelector , useDispatch} from 'react-redux';
import {contactSelector , removeAllContacts} from "../../redux/contactSlice";
import Item from "./Item"; 

function List() {
  const dispatch = useDispatch();
    const contacts = useSelector(contactSelector.selectAll); //selectAll array olarak tutar 
    console.log('contacts :>> ', contacts);

    const total = useSelector(contactSelector.selectTotal); //kaç tane var o sayıyı döndürür  
    console.log('total :>> ', total);

    const handleDeleteAll = () => {
      if(window.confirm("Are you sure?")){
        dispatch(removeAllContacts());
      }
    }
  return (
    <div>
      {
        total > 0 && (
          <div className='removeAllBtn' onClick={handleDeleteAll}>Remove All</div>
        )
      }     
       <ul className='list'>
        {
            contacts.map(contact => <Item key={contact.id}  item={contact}/>)
        }
    </ul>
    </div>
   
  )
}

export default List;