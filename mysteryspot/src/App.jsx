

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoadingPage from "./pages/LoadingPage"
import MenuPage from "./pages/MenuPage"
import UsernamePopup from "./components/UsernamePopup"
import GameOver from "./pages/GameOverPage"   // <-- import GameOver page
import { SoundProvider } from "./context/SoundContext"

export default function App() {
  const [username, setUsername] = useState(null)
  const [showLoading, setShowLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const savedName = localStorage.getItem("username");
    if (savedName) {
      setUsername(savedName);
      setShowLoading(true)
    }
  }, []);

  if (!username) {
    return (
      <UsernamePopup
        onSubmit={(name) => {
          localStorage.setItem("username", name)
          setUsername(name)
          setShowLoading(true)
        }}
      />
    )
  }

  return (
    <SoundProvider>
      {showLoading && !loaded ? (
        <LoadingPage onFinish={() => setLoaded(true)} />
      ) : loaded ? (
        
          <Routes>
            <Route path="/" element={<MenuPage />} />
            <Route path="/gameover" element={<GameOver />} /> {/* GameOver route */}
          </Routes>
        
      ) : null}
    </SoundProvider>
  )
}
