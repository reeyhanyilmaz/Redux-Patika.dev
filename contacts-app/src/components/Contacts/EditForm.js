import {useState} from 'react';
import {useDispatch} from "react-redux";
import {updateContact} from "../../redux/contactSlice";
import {useNavigate} from "react-router-dom"

function EditForm({contact}) { //edit.js'den contact'i prop çektik
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState(contact.name);
    const [number, setNumber] = useState(contact.phone_number);
    const handleSubmit = (e) => {
        e.preventDefault(); //native (varsayılan) davranışı engelliyoruz, submit olunca sayfanın yenilenmesini engellemek icin.
    
        if(!name || !number) return false;
  
        dispatch(updateContact({
            id: contact.id,
            changes: { //değişen şeyleri bu field'a veriyoruz.
                name,
                number
            }
        }));
        setName("");
        setNumber(""); 
        navigate("/");
    };

  return (
    <div>
    <form onSubmit={handleSubmit}>
        <input placeholder='name' value={name} onChange={(e) => setName(e.target.value)}/>
        <input placeholder='phone number' value={number} onChange={(e) => setNumber(e.target.value)}  />
        <div className="btn">
          <button type='submit'>Update</button>
        </div>          
    </form>
</div>
  )
}

export default EditForm;