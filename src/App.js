import "./App.scss";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import ToDo from './pages/ToDo';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/:ProjectTitle" element={<Project />} />
        <Route path='/:ProjectTitle/:ToDoTitle' element={<ToDo/>}/>
      </Routes>
    </>
  );
}

export default App;
