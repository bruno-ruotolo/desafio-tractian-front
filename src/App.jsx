import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyled from "./global/globalStyled";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyled />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
