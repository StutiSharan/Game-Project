import { db } from "../firebase/firebase"; // your firebase config
import { doc, setDoc, getDoc } from "firebase/firestore";

export async function saveBestScore(username, level, newScore, time) {
  try {
    const scoreRef = doc(db, "users", username, "scores", level);

    // get current score
    const scoreSnap = await getDoc(scoreRef);
    console.log(scoreRef);
    if (scoreSnap.exists()) {
      const currentBest = scoreSnap.data().bestScore || 0;

      // update only if new score is higher
      if (newScore > currentBest) {
        await setDoc(
          scoreRef,
          {
            bestScore: newScore,
            bestTime: time, // ⏱️ also save time with new best score
            updatedAt: new Date().toISOString(), // optional timestamp
          },
          { merge: true }
        );
        console.log("✅ Best score & time updated!");
      } else {
        console.log("⚡ Not higher than current best, no update.");
      }
    } else {
      // if score does not exist, create new
      await setDoc(scoreRef, {
        bestScore: newScore,
        bestTime: time,
        createdAt: new Date().toISOString(),
      });
      console.log("✅ New score & time saved!");
    }
  } catch (error) {
    console.error("❌ Error saving score:", error);
  }
}
