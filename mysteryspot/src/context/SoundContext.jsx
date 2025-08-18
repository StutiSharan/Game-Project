import { createContext, useContext, useState } from "react"
import { Howl } from "howler"

const SoundContext = createContext()

const clickSound = new Howl({
  src: ["/click.mp3"],
  volume: 0.5,
})

export function SoundProvider({ children }) {
  const [soundOn, setSoundOn] = useState(true)

  const playSound = () => {
    if (soundOn) {
      clickSound.stop()
      clickSound.play()
    }
  }

  return (
    <SoundContext.Provider value={{ soundOn, setSoundOn, playSound }}>
      {children}
    </SoundContext.Provider>
  )
}

export const useSound = () => useContext(SoundContext)
