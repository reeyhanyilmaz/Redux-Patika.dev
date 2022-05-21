import {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement , incrementByAmount} from "../../redux/counter/counterSlice";

function Counter() {
  const [amount, setAmount] = useState(3);
  const countValue = useSelector((state) => state.counter.value); //counterSlice'daki value.
  const dispatch = useDispatch(); //action'ı dispacth etmemiz lazım, reducer'da değişim sağlansın ve store'a yazılabilsin.
  console.log(countValue);

  return (
    <div>
      <h1>{countValue}</h1>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(increment())}>+</button>
      <br /><br />
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}/>
      <button onClick={() => dispatch(incrementByAmount(amount))}>Arttır</button>
    </div>
  );
}

export default Counter;
