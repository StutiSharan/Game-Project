import { useState } from "react";

export default function SettingsModal({ onClose }) {
  const [sound, setSound] = useState(true);
  const [difficulty, setDifficulty] = useState("Easy");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-20">
      <div className="bg-gray-900 text-gray-100 p-8 rounded-xl max-w-sm mx-4">
        <h2 className="text-3xl font-bold text-yellow-400 mb-4">Settings</h2>
        <div className="space-y-4 text-lg">
          <label className="flex justify-between items-center">
            <span>Sound</span>
            <input
              type="checkbox"
              checked={sound}
              onChange={() => setSound(!sound)}
            />
          </label>
          <label className="flex justify-between items-center">
            <span>Difficulty</span>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="text-black rounded"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </label>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full px-6 py-2 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-600 transition"
        >
          Save & Close
        </button>
      </div>
    </div>
  );
}
