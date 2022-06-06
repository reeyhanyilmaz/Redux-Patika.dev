import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllQuotes,
  quotesSelector,
  statusSelector,
  errorSelector,
} from "../../redux/quotesSlice";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import Item from "./Item";

function Quotes() {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.quotes.items); aşağıdaki gibi de çekebiliriz.
  const data = useSelector(quotesSelector);
  const status = useSelector(statusSelector);
  const error = useSelector(errorSelector);
  console.log("quotesslice data: ", data);

  useEffect(() => {
    if(status === "idle") {
    dispatch(fetchAllQuotes()); //sayfayı tekrar tekrar yüklemesin diye.
    }
  }, [dispatch, status]);

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div style={{ padding: 10 }}>
      <h1>Quotes</h1>
      {status === "loading" && <Loading />}

      {status === "succeeded" &&
        data.map((item) => <Item key={item.quote_id} item={item} />)}
      {/* prop olarak item verilmezse hata alırız */}

      {status === "succeeded" && <div className="quotes_length">{data.length} quotes</div>}
    </div>
  );
}

export default Quotes;
