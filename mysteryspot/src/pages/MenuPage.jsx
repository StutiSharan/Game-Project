import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "../components/ui/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/Dialog"
import { Settings, BookOpen, Play } from "lucide-react"
import { useSound } from "../context/SoundContext" // global sound state

export default function Menu() {
  const [openSettings, setOpenSettings] = useState(false)
  const [openInstructions, setOpenInstructions] = useState(false)

  const { soundOn, setSoundOn, playSound } = useSound()

  return (
    <div className="h-screen w-screen flex items-center justify-center relative overflow-hidden">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center sm:bg-contain blur-sm opacity-90"
        style={{ backgroundImage: "url('/image1.png')" }}
      />

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Floating corner buttons */}
      <div className="absolute top-6 left-6 z-10">
        <Button
          onClick={() => {
            setOpenSettings(true)
            playSound()
          }}
          className="rounded-full bg-yellow-600 hover:bg-yellow-700 shadow-lg p-3"
        >
          <Settings className="w-8 h-8" />
        </Button>
      </div>

      <div className="absolute top-6 right-6 z-10">
        <Button
          onClick={() => {
            setOpenInstructions(true)
            playSound()
          }}
          className="rounded-full bg-yellow-600 hover:bg-yellow-700 shadow-lg p-3"
        >
          <BookOpen className="w-8 h-8" />
        </Button>
      </div>

      {/* Main Menu */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="flex flex-col items-center justify-center text-center relative z-10"
      >
        <h1 className="text-5xl font-extrabold text-yellow-300 drop-shadow-lg mb-12">
          MysterySpot
        </h1>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={playSound}
            className="flex items-center gap-2 px-10 py-6 text-2xl font-bold rounded-2xl bg-yellow-600 hover:bg-yellow-700 text-white shadow-xl"
          >
            <Play className="w-7 h-7" />
            Play
          </Button>
        </motion.div>
      </motion.div>

      {/* Settings Popup */}
      <Dialog open={openSettings} onOpenChange={setOpenSettings}>
        <DialogContent className="bg-yellow-200 rounded-2xl shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-yellow-900 text-2xl">⚙️ Settings</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg text-yellow-900 font-semibold">Sound</span>
              <Button
                onClick={() => {
                  if (soundOn) {
                    setSoundOn(false) // mute globally
                  } else {
                    setSoundOn(true)
                    playSound() // confirm ON
                  }
                }}
                className="rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-bold"
              >
                {soundOn ? "ON 🔊" : "OFF 🔇"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Instructions Popup */}
      <Dialog open={openInstructions} onOpenChange={setOpenInstructions}>
        <DialogContent className="bg-yellow-200 rounded-2xl shadow-xl max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-yellow-900 text-2xl">📖 How to Play</DialogTitle>
          </DialogHeader>
          <div className="mt-4 text-yellow-900 space-y-3 text-lg">
            <p>1️⃣ Find all hidden objects in the scene.</p>
            <p>2️⃣ Click on objects to collect them.</p>
            <p>3️⃣ Beat the timer for extra points!</p>
            <p>💡 Tip: Use hints wisely.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
