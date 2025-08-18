import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function GameOver() {
  const navigate = useNavigate();

  // Focus the button for keyboard users
  useEffect(() => {
    const btn = document.getElementById("leaderboard-btn");
    if (btn) btn.focus();
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-yellow-500 via-yellow-600 to-yellow-800 text-black">
      {/* Animated background blobs */}
      <motion.div
        className="pointer-events-none absolute -top-28 -left-28 h-72 w-72 rounded-full blur-3xl bg-yellow-300/60"
        animate={{ y: [0, 25, 0], x: [0, 15, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-28 -right-28 h-80 w-80 rounded-full blur-3xl bg-orange-400/60"
        animate={{ y: [0, -20, 0], x: [0, -15, 0] }}
        transition={{ duration: 9, repeat: Infinity }}
      />

      {/* Game Over Card */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 140, damping: 12 }}
        className="relative z-10 w-[92%] max-w-md rounded-3xl border border-black/10 bg-white/70 backdrop-blur-xl p-8 shadow-2xl"
      >
        {/* Title */}
        <motion.h1
          initial={{ scale: 0.85, rotate: -3 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="text-center text-5xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-orange-500 to-red-500"
        >
          GAME OVER
        </motion.h1>

        {/* Creative message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-center text-black"
        >
          <p className="text-lg font-semibold">Your adventure has ended!</p>
          <p className="mt-2 text-sm text-zinc-700">
            But don’t worry, your score is saved. <br />
            Head to the leaderboard to see how you rank!
          </p>
        </motion.div>

        {/* Actions */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <motion.button
            id="leaderboard-btn"
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/leaderboard")}
            className="w-full rounded-2xl px-5 py-3 font-semibold text-black bg-yellow-400 hover:bg-yellow-300 shadow-lg outline-none focus:ring-2 focus:ring-yellow-400"
          >
            Go to Leaderboard
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="w-full rounded-2xl px-5 py-3 font-semibold bg-zinc-800 hover:bg-zinc-700 text-white"
          >
            Play Again
          </motion.button>
        </div>

        {/* Tip */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center text-sm text-zinc-700"
        >
          Tip: Beat your last attempt and climb the leaderboard!
        </motion.p>
      </motion.section>
    </div>
  );
}
