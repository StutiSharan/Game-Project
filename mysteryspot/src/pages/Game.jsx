import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";
import { FaSignOutAlt, FaLightbulb } from "react-icons/fa";
import { Howl, Howler } from "howler";
import myClues from "../components/game_Clue";
import UsernamePopup from "../components/UsernamePopup";
import { saveBestScore } from "../components/scoring";

// Backgrounds
import easyBg from "../assets/scene4.jpg";
import mediumBg from "../assets/scene1.png";
import hardBg from "../assets/scene6.1.png";

// 🎵 Sounds
import landingMusicFile from "../sounds/spiderweb-189618.mp3";
import gameMusicFile from "../sounds/serious-intense-music-no-copy-right-388799.mp3";
import clickSoundFile from "../sounds/mixkit-fast-double-click-on-mouse-275.wav";
import lvlSelect from "../sounds/mixkit-sci-fi-click-900.wav";
import successSoundFile from "../sounds/claps-29454.mp3";
import failSoundFile from "../sounds/whoosh-cinematic-sound-effect-376889.mp3";
import Leaderboard from "./LeaderBoard";

export default function Game({ onQuit }) {
  const [level, setLevel] = useState(null);
  const [clues, setClues] = useState([]);
  const [foundClues, setFoundClues] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [hintsLeft, setHintsLeft] = useState(0);
  const [activeHint, setActiveHint] = useState(null); // 👈 now stores hint text
  const [username, setUsername] = useState(null);
  const [score, setScore] = useState(0);

  const imgRef = useRef(null);
  const [showLeaderboard, setShowLeaderboard] = useState({
    open: false,
    autoClose: false,
  });

  // 🎵 Sounds
  const landingMusic = new Howl({
    src: [landingMusicFile],
    loop: true,
    volume: 0.4,
  });
  const gameMusic = new Howl({ src: [gameMusicFile], loop: true, volume: 0.4 });
  const clickSound = new Howl({ src: [clickSoundFile], volume: 1.0 });
  const levelSelect = new Howl({ src: [lvlSelect], volume: 1.0 });
  const successSound = new Howl({ src: [successSoundFile], volume: 1.0 });
  const failSound = new Howl({ src: [failSoundFile], volume: 1.0 });

  const ORIGINAL_WIDTH = 1920;
  const ORIGINAL_HEIGHT = 1080;

  const levelSettings = {
    easy: { clues: 5, time: 180, bg: easyBg, hints: 5 },
    medium: { clues: 5, time: 150, bg: mediumBg, hints: 4 },
    hard: { clues: 5, time: 120, bg: hardBg, hints: 3 },
  };

  //leaderboard show
  const handleLeaderboard = () => {
    setShowLeaderboard(true);
  };
  // Load username
  useEffect(() => {
    const savedName = localStorage.getItem("username");
    if (savedName) setUsername(savedName);
  }, []);

  // Play landing music before starting level
  useEffect(() => {
    if (!level) {
      Howler.stop();
      landingMusic.play();
    }
  }, [level]);

  // Start level
  const startLevel = (lvl) => {
    Howler.stop();
    levelSelect.play();
    setLevel(lvl);
    generateClues(levelSettings[lvl].time);
    setTimeLeft(levelSettings[lvl].time);
    setFoundClues(0);
    setGameOver(false);
    setHintsLeft(levelSettings[lvl].hints);
    setScore(0);
    gameMusic.play();
  };

  // Timer
  useEffect(() => {
    if (!level || gameOver) return;
    if (timeLeft <= 0) {
      endGame(false);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, gameOver, level]);

  // Generate clues
  const generateClues = (count) => {
    let id = count === 180 ? 4 : count === 150 ? 1 : 6;
    const converted = myClues[id].map((c) => ({
      ...c,
      xPercent: (c.x / ORIGINAL_WIDTH) * 100,
      yPercent: (c.y / ORIGINAL_HEIGHT) * 100,
      found: false,
    }));
    setClues(converted);
  };

  // Click handler (only count if inside correct clue)
  const handleClick = (e) => {
    if (gameOver) return;

    const img = imgRef.current;
    if (!img) return;

    const rect = img.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    let foundSomething = false;
    const radius = 40; // tolerance

    setClues((prev) =>
      prev.map((c) => {
        const clueX = (c.xPercent / 100) * rect.width;
        const clueY = (c.yPercent / 100) * rect.height;

        const isInside =
          Math.abs(clickX - clueX) <= radius &&
          Math.abs(clickY - clueY) <= radius;

        if (!c.found && isInside) {
          foundSomething = true;
          clickSound.play();
          setFoundClues((f) => f + 1);
          setScore((s) => s + 10);
          if (foundClues + 1 === levelSettings[level].clues) {
            endGame(true);
          }
          return { ...c, found: true };
        }
        return c;
      })
    );

    if (!foundSomething) {
      console.log("❌ Wrong click");
    }
  };

  // ✅ Use hint with popup
  const useHint = () => {
    if (hintsLeft <= 0 || gameOver) return;
    const hiddenClues = clues.filter((c) => !c.found);
    if (hiddenClues.length === 0) return;

    const randomClue =
      hiddenClues[Math.floor(Math.random() * hiddenClues.length)];

    setActiveHint(randomClue.hint || "Look carefully around the scene!");
    setHintsLeft((prev) => prev - 1);
    setScore((prev) => prev - 5);

    setTimeout(() => setActiveHint(null), 4000); // hide after 4s
  };

  // End game
  const endGame = (won) => {
    setGameOver(true);
    Howler.stop();
    if (won) successSound.play();
    else failSound.play();

    if (username && level) {
      const timeTaken = levelSettings[level].time - timeLeft;
      const finalScore = score + timeLeft; // ✅ add time bonus
      saveBestScore(username, level, finalScore, timeTaken);
    }
  };

  const restart = () => {
    setLevel(null);
    setGameOver(false);
    Howler.stop();
    landingMusic.play();
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center blur-sm opacity-90"
        style={{
          backgroundImage: `url(${
            level ? levelSettings[level].bg : "/image1.png"
          })`,
        }}
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Quit Button */}
      <div className="absolute bottom-4 right-4 z-20">
        <Button
          onClick={onQuit}
          className="rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg p-4"
        >
          <FaSignOutAlt size={20} />
        </Button>
      </div>

      {/* Username Popup */}
      {!username && (
        <UsernamePopup
          onSubmit={(name) => {
            localStorage.setItem("username", name);
            setUsername(name);
          }}
        />
      )}

      {/* Level Selection */}
      {!level && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 text-center flex flex-col items-center p-4"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold text-yellow-300 drop-shadow-lg mb-8">
            Select Difficulty
          </h1>
          {["easy", "medium", "hard"].map((lvl) => (
            <motion.div
              key={lvl}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="mb-4 w-full flex justify-center"
            >
              <Button
                onClick={() => startLevel(lvl)}
                className="w-40 md:w-56 py-4 text-lg md:text-2xl font-bold rounded-2xl bg-yellow-600 hover:bg-yellow-700 text-white shadow-xl capitalize"
              >
                {lvl}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Gameplay */}
      {level && !gameOver && (
        // <div className="relative w-full h-full flex flex-col p-2 sm:p-4">
        //   {/* HUD */}
        //   <div className="flex justify-between items-center text-yellow-200 text-sm md:text-lg font-bold px-2 md:px-6 py-2">
        //     <span>⏱ {formatTime(timeLeft)}</span>
        //     <span>
        //       🔎 {foundClues}/{levelSettings[level].clues}
        //     </span>
        //     <span>⭐ {score} pts</span>
        //     <Button
        //       onClick={useHint}
        //       disabled={hintsLeft <= 0}
        //       className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg text-sm md:text-base"
        //     >
        //       <FaLightbulb /> {hintsLeft}
        //     </Button>
        //   </div>

        //   {/* ✅ Hint Popup */}
        //   {activeHint && (
        //     <motion.div
        //       initial={{ opacity: 0, scale: 0.8 }}
        //       animate={{ opacity: 1, scale: 1 }}
        //       exit={{ opacity: 0 }}
        //       className="absolute top-20 left-1/2 transform -translate-x-1/2
        //                  bg-yellow-200 text-black px-6 py-3 rounded-lg shadow-lg
        //                  font-bold text-lg z-30"
        //     >
        //       💡 Hint: {activeHint}
        //     </motion.div>
        //   )}

        //   {/* Game Scene */}
        //   <div className="relative w-full max-w-6xl h-[87vh] mx-auto aspect-[16/9]">
        //     <img
        //       ref={imgRef}
        //       src={levelSettings[level].bg}
        //       alt="scene"
        //       className="absolute inset-0 w-full h-full object-contain cursor-crosshair"
        //       onClick={handleClick}
        //     />
        //     {clues.map((clue) => {
        //       const img = imgRef.current;
        //       let top = 0,
        //         left = 0;
        //       if (img) {
        //         const rect = img.getBoundingClientRect();
        //         top = (clue.yPercent / 100) * rect.height;
        //         left = (clue.xPercent / 100) * rect.width;
        //       }
        //       return (
        //         <motion.div
        //           key={clue.id}
        //           className="absolute w-6 h-6 md:w-10 md:h-10 rounded-full"
        //           style={{ top, left }}
        //           animate={activeHint === clue.id ? { scale: [1, 1.5, 1] } : {}}
        //         >
        //           {clue.found ? "✅" : ""}
        //         </motion.div>
        //       );
        //     })}
        //   </div>
        // </div>
        <div className="relative w-full h-full flex flex-col p-2 sm:p-4">
          {/* HUD */}
          <div className="flex justify-between items-center text-yellow-200 text-sm md:text-lg font-bold px-2 md:px-6 py-2">
            <span>⏱ {formatTime(timeLeft)}</span>
            <span>
              🔎 {foundClues}/{levelSettings[level].clues}
            </span>
            <span>⭐ {score} pts</span>
            <Button
              onClick={useHint}
              disabled={hintsLeft <= 0}
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg text-sm md:text-base"
            >
              <FaLightbulb /> {hintsLeft}
            </Button>
          </div>

          {/* ✅ Hint Popup */}
          {activeHint && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-20 left-1/2 transform -translate-x-1/2 
                   bg-yellow-200 text-black px-6 py-3 rounded-lg shadow-lg 
                   font-bold text-lg z-30"
            >
              💡 Hint: {activeHint}
            </motion.div>
          )}

          {/* ✅ Responsive Game Area */}
          <div className="flex flex-col md:flex-row gap-3 w-full h-[87vh] max-w-6xl mx-auto">
            {/* 🎯 Clue Name Box */}
            {/* <div className="bg-black/50 text-yellow-200 rounded-xl p-3 w-40 overflow-y-auto">
              <h3 className="text-lg font-bold mb-3">🔍 Objects to Find</h3>
              <ul className="space-y-2">
                {clues.map((clue) => (
                  <li
                    key={clue.id}
                    className={`flex items-center gap-2 ${
                      clue.found ? "line-through text-green-400" : ""
                    }`}
                  >
                    {clue.found ? "✅" : "⭕"} {clue.name || "Unknown"}
                  </li>
                ))}
              </ul>
            </div> */}

            <div className="bg-black/50 text-yellow-200 rounded-xl p-3 w-full md:w-40 overflow-x-auto md:overflow-y-autoflex md:block">
              <h3 className="hidden md:block text-lg font-bold mb-3">
                🔍 Objects to Find
              </h3>

              <ul className="flex md:block gap-3 md:gap-2 flex-wrap md:flex-nowrap text-sm md:text-base">
                {clues.map((clue) => (
                  <li
                    key={clue.id}
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg 
          ${
            clue.found
              ? "line-through text-green-400 bg-green-900/40"
              : "text-yellow-200 bg-yellow-900/40"
          }`}
                  >
                    {clue.found ? "✅" : "⭕"} {clue.name || "Unknown"}
                  </li>
                ))}
              </ul>
            </div>

            {/* 🎯 Game Scene */}
            <div className="relative flex-1 h-full aspect-[16/9]">
              <img
                ref={imgRef}
                src={levelSettings[level].bg}
                alt="scene"
                className="absolute inset-0 w-full h-full object-contain cursor-crosshair"
                onClick={handleClick}
              />
              {clues.map((clue) => {
                const img = imgRef.current;
                let top = 0,
                  left = 0;
                if (img) {
                  const rect = img.getBoundingClientRect();
                  top = (clue.yPercent / 100) * rect.height;
                  left = (clue.xPercent / 100) * rect.width;
                }
                return (
                  <motion.div
                    key={clue.id}
                    className="absolute w-6 h-6 md:w-7 md:h-7 rounded-full"
                    style={{ top, left }}
                    animate={
                      activeHint === clue.id ? { scale: [1, 1.5, 1] } : {}
                    }
                  >
                    {clue.found ? "✅" : ""}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Game Over Screen */}
      {gameOver && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/70 text-center p-4"
        >
          <h2 className="text-2xl md:text-4xl font-extrabold text-yellow-300 mb-6">
            {foundClues === levelSettings[level].clues
              ? "🎉 You Win!"
              : "💀 Game Over"}
          </h2>
          <p className="text-yellow-100 text-lg md:text-xl mb-2">
            Found {foundClues}/{levelSettings[level].clues}
          </p>
          <p className="text-yellow-200 text-lg md:text-2xl font-bold mb-8">
            {username}, your score: ⭐ {score + timeLeft} pts
            {/* {
             saveBestScore(
               username,
               level,
               score,
               levelSettings[level].time - timeLeft
             )} */}
            {console.log(
              username,
              level,
              score + timeLeft,
              levelSettings[level].time - timeLeft
            )}
          </p>
          <div className="flex gap-4">
            <Button
              onClick={restart}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold"
            >
              Restart
            </Button>
            {/* Quit + Leaderboard buttons */}

            <Button
              onClick={() =>
                setShowLeaderboard({ open: true, autoClose: true })
              } // Quit → autoClose
              className="bg-red-600 hover:bg-red-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold"
            >
              Quit
            </Button>

            <Button
              onClick={() =>
                setShowLeaderboard({ open: true, autoClose: false })
              } // Leaderboard → manual
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold"
            >
              🏆 Leaderboard
            </Button>
          </div>

          {showLeaderboard.open && (
            <div className="fixed inset-0 backdrop-blur-md bg-white/20 border border-white/30 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-3xl relative">
                {/* Close Button */}
                <button
                  onClick={() => {
                    setShowLeaderboard({ open: false, autoClose: false });
                    if (showLeaderboard.autoClose) {
                      onQuit();
                    }
                  }}
                  className="absolute top-3 right-3 text-gray-600 hover:text-red-600 text-xl font-bold"
                >
                  ✕
                </button>

                {/* Leaderboard Component */}
                <Leaderboard
                  autoClose={showLeaderboard.autoClose}
                  onClose={() => {
                    setShowLeaderboard({ open: false, autoClose: false });
                    if (showLeaderboard.autoClose) {
                      onQuit();
                    }
                  }}
                />
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
