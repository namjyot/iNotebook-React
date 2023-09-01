import About from "./components/About";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState'
import Login from "./components/Login";
import Signup from "./components/Signup";
import AlertState from "./context/notes/AlertState";

function App() {
  return (
    <>
    <NoteState>
      <AlertState>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/about" element={<About />}></Route>
          <Route exact path="/login" element={<Login/>}></Route>
          <Route exact path="/signup" element={<Signup/>}></Route>
        </Routes>
      </BrowserRouter>
      </AlertState>
      </NoteState>
    </>
  );
}

export default App;
