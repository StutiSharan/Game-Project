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

        console.log("Leaderboard data (ordered):", results);
        setPlayers(results);
      } catch (err) {
        console.error("Error fetching leaderboard with order:", err);

        // fallback (no orderBy)
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

          console.log("Leaderboard data (fallback):", results);
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
    <div className="p-6 rounded-2xl backdrop-blur-md bg-white/20 border border-white/30 shadow-xl z-20 w-[90%] max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">🏆 Leaderboard</h2>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-6">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-3 text-gray-600">Fetching leaderboard...</p>
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
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
                className={
                  currentUser === p.username ? "bg-yellow-200 font-bold" : ""
                }
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
      )}

      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
      >
        Close
      </button>
    </div>
  );
}
