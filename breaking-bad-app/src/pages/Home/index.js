import {useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux";
import {fetchCharacters} from "../../redux/charactersSlice"

function Home() {
  const dispatch = useDispatch();
    const data = useSelector(state => state.characters);
    console.log("data" , data);

    //component (load olunca) mount edildiğinde fethCharacters çalışsın diye useEffect kullandık.
    useEffect(() => {
      dispatch(fetchCharacters());
    }, [dispatch]) //dependencey array'e dispactch verdik.
  return (
    <div>Home</div>
  )
}

export default Home;