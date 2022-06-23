import Form from "./Form";
import List from './List';
import {useSelector} from "react-redux";
import {contactSelector} from "../../redux/contactSlice";

function Contacts() {

  const total = useSelector(contactSelector.selectTotal); //contactSelector state.contacts getirir bize.
  return (
    <>
        <h1>Contacts ({total}) </h1>
        <Form />
        <List /> 
    </>
  )
}

export default Contacts;