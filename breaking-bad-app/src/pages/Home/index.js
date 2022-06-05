import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCharacters } from "../../redux/charactersSlice";
import Masonry from "react-masonry-css";
import "./styles.css";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters.items);
  const nextPage = useSelector((state) => state.characters.page);
  const hasNextPage = useSelector((state) => state.characters.hasNextPage);
  const status = useSelector((state) => state.characters.status);
  const error = useSelector((state) => state.characters.error);
  console.log("data", characters);

  //component (load olunca) mount edildiğinde fethCharacters çalışsın diye useEffect kullandık.
  useEffect(() => {
    if(status === "idle"){
      //detay ekrana gidip geri geldiğimiz de tekrar dispacth yapıyor ve (12li tekrar ekrana basıyor) unique key hatası alıyoruz. O yüzden fetch etmemesini sağlamak için
      dispatch(fetchCharacters());
    }
  }, [dispatch, status]); //dependencey array'e dispactch verdik.


  if (status === "failed") {
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
             <Link to={`/char/${character.char_id}`}>
            <img
              alt={character.name}
              src={character.img}
              className="character-img"
            />
            <div className="char_name">{character.name}</div>
            </Link>
          </div>
        ))}
        {/* array of JSX items */}
      </Masonry>

      <div style={{ padding: "20px 0 40px 0", textAlign: "center" }}>
        {status === "loading" && <Loading />}

        {/* loading yoksa ve baika gösterilecek sayfa yoksa (items elemanları) bunu butonu göster  ve çalıştır. */}
        {hasNextPage && status !== "loading" && (<button onClick={() => dispatch(fetchCharacters(nextPage))}>Load More ({nextPage})</button>)}

        {!hasNextPage && <div>There is nothing to be shown.</div>}    
      </div>
    </div>
  ); 
}

export default Home;
