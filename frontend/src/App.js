import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Team from "./pages/Team";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="home" element={<Home />} />
        <Route path="contact" element={<Team />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
