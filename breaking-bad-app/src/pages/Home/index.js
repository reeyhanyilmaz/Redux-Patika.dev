import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCharacters } from "../../redux/charactersSlice";
import Masonry from "react-masonry-css";
import "./styles.css";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

function Home() {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters.items);
  const isLoading = useSelector((state) => state.characters.isLoading);
  const error = useSelector((state) => state.characters.error);
  console.log("data", characters);

  //component (load olunca) mount edildiğinde fethCharacters çalışsın diye useEffect kullandık.
  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]); //dependencey array'e dispactch verdik.

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error message={error} />;
  }

  return (
    <div>
      <Masonry
        breakpointCols={4}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {characters.map((character) => (
          <div key={character.char_id}>
            <img
              alt={character.name}
              src={character.img}
              className="character-img"
            />
            <div className="char_name">{character.name}</div>
          </div>
        ))}
        {/* array of JSX items */}
      </Masonry>
    </div>
  );
}

export default Home;
