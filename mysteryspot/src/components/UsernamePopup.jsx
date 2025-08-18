import { useState } from "react";
import { motion } from "framer-motion";

export default function UsernamePopup({ onSubmit }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      localStorage.setItem("username", inputValue); // ✅ Save username to localStorage
      onSubmit(inputValue); // Pass username back to parent
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Blurry background image */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-md"
        style={{ backgroundImage: "url('/image1.png')" }}
      />
      {/* Yellow overlay */}
      <div className="absolute inset-0 bg-yellow-300 bg-opacity-40 backdrop-blur-sm" />

      {/* Popup box */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="relative bg-yellow-100 rounded-3xl shadow-2xl p-8 w-96 text-center border-4 border-yellow-500"
      >
        <h2 className="text-3xl font-extrabold text-yellow-900 drop-shadow-md mb-6">
          Enter Username
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your username..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full rounded-xl p-3 mb-5 border-2 border-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-500 text-lg"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-yellow-500 text-white py-3 rounded-xl font-bold text-lg shadow-md hover:bg-yellow-600 transition"
          >
            Start Game 🚀
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
