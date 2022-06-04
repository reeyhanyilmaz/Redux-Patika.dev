import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCharacters } from "../../redux/charactersSlice";
import Masonry from "react-masonry-css";
import "./styles.css"

function Home() {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters.items);
  console.log("data", characters);

  //component (load olunca) mount edildiğinde fethCharacters çalışsın diye useEffect kullandık.
  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]); //dependencey array'e dispactch verdik.
  return (
    <div>
      <Masonry
        breakpointCols={4}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {characters.map((character) => (
          <div key={character.char_id}>
            <img alt={character.name} src={character.img} className="character-img"/>
          </div>
        ))}
        {/* array of JSX items */}
      </Masonry>
    </div>
  );
}

export default Home;
