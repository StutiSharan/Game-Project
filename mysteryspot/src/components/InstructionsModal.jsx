export default function InstructionsModal({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/10 backdrop-blur-sm z-20">
      <div className="bg-gray-900 text-gray-100 p-8 rounded-xl max-w-lg mx-4">
        <h2 className="text-3xl font-bold text-yellow-400 mb-4">How to Play</h2>
        <ul className="space-y-2 text-lg">
          <li> • Search for hidden objects in the scene.</li>
          <li> • Tap items to collect them before time runs out.</li>
          <li> • Complete within the time limit to get bonus points.</li>
          <li> • Access hints if you get stuck (limited uses).</li>
        </ul>
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
