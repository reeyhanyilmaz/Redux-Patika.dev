import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Detail from "./pages/Detail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/char/:char_id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
