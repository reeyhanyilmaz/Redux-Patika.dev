import './App.css';
import Contacts from './components/Contacts';
import Edit from './components/Edit';
import { Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Contacts />  } />
          <Route path="/edit/:id" element={<Edit />} />
      </Routes>      
    </div>
  );
}

export default App;
