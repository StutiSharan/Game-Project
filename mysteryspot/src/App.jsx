import { useState,useEffect } from "react"
import LoadingPage from "./pages/LoadingPage"
import MenuPage from "./pages/MenuPage"
import UsernamePopup from "./components/UsernamePopup"
import { SoundProvider } from "./context/SoundContext"

export default function App() {
  const [username, setUsername] = useState(null)
  const [showLoading, setShowLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const savedName = (localStorage.getItem("username"));
    if (savedName) {
      setUsername(savedName);
      setShowLoading(true)
    }
  }, []);

  if (!username) {
    return (
      <UsernamePopup
        onSubmit={(name) => {
          localStorage.setItem("username", name) // save only on submit
          setUsername(name)
          setShowLoading(true) // then move to loading
        }}
      />
    )
  }

  return (
    <SoundProvider>
      {showLoading && !loaded ? (
        <LoadingPage onFinish={() => setLoaded(true)} />
      ) : loaded ? (
        <MenuPage />
      ) : null}
    </SoundProvider>
  )

}
