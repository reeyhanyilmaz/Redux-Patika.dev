import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import Home from "./pages/Home"

function App() {
  return (
    <div className="App">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
    </Routes>
  </div>
  );
}

function About() {
  return <div>About</div>
}

export default App;
