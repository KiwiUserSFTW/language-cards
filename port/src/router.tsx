// react
import { FC } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

// components
import Layout from './components/general/layout/layout';
import Aftercare from './components/aftercare/aftercare';
import ComingSoon from './components/comingSoon/comingSoon';
import CreamComposition from './components/aftercare/creamComposition/creamComposition';

const Router: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/home" />} />
        <Route path="/home" element={<ComingSoon />} />
        <Route path="/aftercare" element={<Aftercare />} />
        <Route path="/cream-composition" element={<CreamComposition />} />
        <Route path="/portfolio" element={<ComingSoon />} />
        <Route path="/about-me" element={<ComingSoon />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
