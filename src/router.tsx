// react
import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Cards from "./components/cards/cards";
import Dictionaries from "./components/dictionaries/dictionaries";

const Router: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/cards" element={<Cards />} />
      <Route path="/dictionaries" element={<Dictionaries />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
