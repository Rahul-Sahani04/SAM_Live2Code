import "./App.css";
import Home from "./pages/Home";
import Main from "./pages/Main";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign_recog" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
