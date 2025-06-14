// react
import { FC } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// components
import Cards from "@components/cards/cards";

const Router: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/cards" />} />
      <Route path="/cards" element={<Cards />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
