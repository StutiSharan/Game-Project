import { useState, useEffect } from "react";
import {
  collectionGroup,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function LeaderBoard({ onClose, currentUser }) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const q = query(
          collectionGroup(db, "scores"),
          orderBy("bestScore", "desc"),
          limit(10)
        );

        const snapshot = await getDocs(q);

        const results = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: `${doc.ref.parent.parent.id}-${doc.id}`, // unique key
            username: doc.ref.parent.parent.id,
            difficulty: doc.id,
            score: data.bestScore || 0,
            time: data.bestTime || 0,
          };
        });

        setPlayers(results);
      } catch (err) {
        console.error("Error fetching leaderboard with order:", err);

        try {
          const fallbackQ = query(collectionGroup(db, "scores"), limit(10));
          const snapshot = await getDocs(fallbackQ);

          const results = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: `${doc.ref.parent.parent.id}-${doc.id}`,
              username: doc.ref.parent.parent.id,
              difficulty: doc.id,
              score: data.bestScore || 0,
              time: data.bestTime || 0,
            };
          });

          setPlayers(results);
        } catch (fallbackErr) {
          console.error("Fallback query also failed:", fallbackErr);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="relative m-4 p-4 sm:p-6 rounded-2xl backdrop-blur-md bg-white/20 border border-white/30 shadow-xl z-20 w-[95%] sm:w-[90%] max-w-2xl mx-auto flex flex-col h-[90vh]">
      {/* Close button fixed at top-right */}
      {/* <button
        onClick={onClose}
        className="m-2 absolute top-3 right-3 text-white bg-red-600 hover:bg-red-700 rounded-full p-2 shadow-md"
      >
        ✕
      </button> */}

      {/* Heading */}
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
        🏆 Leaderboard 🏆
      </h2>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pr-2">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-3 text-gray-600 text-sm sm:text-base">
              Fetching leaderboard...
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2">Rank</th>
                  <th className="p-2">Player</th>
                  <th className="p-2">Difficulty</th>
                  <th className="p-2">Score</th>
                  <th className="p-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {players.map((p, i) => (
                  <tr
                    key={p.id}
                    className={`${
                      currentUser === p.username
                        ? "bg-yellow-200 font-bold"
                        : ""
                    }`}
                  >
                    <td className="p-2">{i + 1}</td>
                    <td className="p-2">{p.username}</td>
                    <td className="p-2">{p.difficulty}</td>
                    <td className="p-2">{p.score}</td>
                    <td className="p-2">{p.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
