import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingPage from "./pages/LoadingPage";
import MenuPage from "./pages/MenuPage";
import GameOver from "./pages/GameOverPage";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return <LoadingPage onFinish={() => setLoaded(true)} />;
  }

  return (
    
      <Routes>
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/gameover" element={<GameOver/>} />
        <Route path="*" element={<MenuPage />} /> {/* Default */}
      </Routes>
    
  );
}
