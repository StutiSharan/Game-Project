// src/components/ui/Dialog.jsx
import { useEffect } from "react";
import { motion } from "framer-motion";

// ✅ Play click sound
function playClick() {
  const audio = new Audio("/click.mp3"); // put file in /public
  audio.play();
}

export function Dialog({ open, onOpenChange, children }) {
  useEffect(() => {
    if (open) playClick(); // play sound on open
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => {
        playClick();
        onOpenChange(false);
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white p-6 rounded-2xl shadow-2xl relative w-[90%] max-w-lg"
        onClick={(e) => e.stopPropagation()} // prevent closing on inner click
      >
        {/* ✅ Close button */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl"
          onClick={() => {
            playClick();
            onOpenChange(false);
          }}
        >
          ✖
        </button>
        {children}
      </motion.div>
    </div>
  );
}

// ✅ Extra helpers for consistency with your imports
export function DialogHeader({ children }) {
  return <div className="mb-4 text-2xl font-bold text-gray-800">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h2 className="text-xl font-semibold text-gray-700">{children}</h2>;
}

export function DialogContent({ children }) {
  return <div className="mt-2 text-gray-600">{children}</div>;
}
