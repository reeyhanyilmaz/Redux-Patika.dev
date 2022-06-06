import React from 'react';
import {useParams , Navigate} from "react-router-dom";
// import {quotesSelector} from "../../redux/quotesSlice";
import { useSelector} from "react-redux";

function QuoteDetail() {
  const {quotes_id} = useParams(); //obje olarak alınca undefined dedi.
  console.log("quote_id" , quotes_id);
  // console.log(items);
  // const items = useSelector(quotesSelector);
  // const quote = items.find((item) => item.quote_id === Number(quote_id)); 
  //id biri string biir number o yüzden başına Number koyduk.
   
  //böyle kısa yol
  const quote = useSelector(state => state.quotes.items.find((item) => item.quote_id ===  Number(quotes_id)));

  if(!quote){
    //detay sayfasında yenileyince sözlerin olduğu sayfaya yönlendirir.
    return <Navigate to="/quotes" />
  }

   return (
    <div>
      <h1>Quote Detail</h1>
      <pre>{JSON.stringify(quote, null, 2)}</pre>
    </div>
  )
}

export default QuoteDetail;