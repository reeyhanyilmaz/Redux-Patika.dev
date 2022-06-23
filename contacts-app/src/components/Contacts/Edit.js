import React from 'react'
import {useParams} from "react-router-dom";
import EditForm from './EditForm';
import {useSelector} from "react-redux";
import {contactSelector} from "../../redux/contactSlice";

function Edit() {
  const {id} = useParams(); //parametreleri alıyoruz.
  console.log('id', id);
  const contact = useSelector(state => contactSelector.selectById(state, id))
  console.log('contact :>> ', contact); //id'ye ail eleman gelir.
 return (
    <div>
      <h1>Edit</h1>
      <EditForm  contact={contact} />
    </div>
  )
}

export default Edit;