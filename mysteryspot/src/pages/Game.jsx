//..............................................................................................
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";
import { FaSignOutAlt, FaLightbulb } from "react-icons/fa";
import { Howl, Howler } from "howler";
import myClues from "../components/game_Clue";
import UsernamePopup from "../components/UsernamePopup";

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
import { saveBestScore } from "../components/scoring";

export default function Game({ onQuit }) {
  const [level, setLevel] = useState(null);
  const [clues, setClues] = useState([]);
  const [foundClues, setFoundClues] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [hintsLeft, setHintsLeft] = useState(0);
  const [activeHint, setActiveHint] = useState(null);
  const [username, setUsername] = useState(null);

  // ✅ scoring
  const [score, setScore] = useState(0);

  const imgRef = useRef(null);

  // 🎵 Sounds
  const landingMusic = new Howl({ src: [landingMusicFile], loop: true, volume: 0.4 });
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

  useEffect(() => {
    const savedName = localStorage.getItem("username");
    if (savedName) setUsername(savedName);
  }, []);

  useEffect(() => {
    if (!level) {
      Howler.stop();
      landingMusic.play();
    }
  }, [level]);

  const startLevel = (lvl) => {
    Howler.stop();
    levelSelect.play();
    setLevel(lvl);
    generateClues(levelSettings[lvl].time);
    setTimeLeft(levelSettings[lvl].time);
    setFoundClues(0);
    setGameOver(false);
    setHintsLeft(levelSettings[lvl].hints);
    setScore(0); // reset score
    gameMusic.play();
  };

  useEffect(() => {
    if (!level || gameOver) return;
    if (timeLeft <= 0) {
      endGame(false);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, gameOver, level]);

  const generateClues = (count) => {
    let id = count === 180 ? 4 : count === 150 ? 1 : 6;
    const converted = myClues[id].map((c) => ({
      ...c,
      xPercent: (c.x / ORIGINAL_WIDTH) * 100,
      yPercent: (c.y / ORIGINAL_HEIGHT) * 100,
    }));
    setClues(converted);
  };

  const handleClueClick = (id) => {
    clickSound.play();
    setClues((prev) =>
      prev.map((c) => (c.id === id ? { ...c, found: true } : c))
    );
    setFoundClues((prev) => prev + 1);
    setScore((prev) => prev + 10); // ✅ +10 for correct clue
    if (foundClues + 1 === levelSettings[level].clues) endGame(true);
  };

  const useHint = () => {
    if (hintsLeft <= 0 || gameOver) return;
    const hiddenClues = clues.filter((c) => !c.found);
    if (hiddenClues.length === 0) return;
    const randomClue = hiddenClues[Math.floor(Math.random() * hiddenClues.length)];
    setActiveHint(randomClue.id);
    setHintsLeft((prev) => prev - 1);
    setScore((prev) => prev - 5); // ✅ -5 for each hint
    setTimeout(() => setActiveHint(null), 4000);
  };

  const endGame = (won) => {
    setGameOver(true);
    Howler.stop();
    if (won) successSound.play();
    else failSound.play();
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
        style={{ backgroundImage: `url(${level ? levelSettings[level].bg : "/image1.png"})` }}
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

      {/* Ask Username if not set */}
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
        <div className="relative w-full h-full flex flex-col p-2 sm:p-4">
          {/* HUD */}
          <div className="flex justify-between items-center text-yellow-200 text-sm md:text-lg font-bold px-2 md:px-6 py-2">
            <span>⏱ {formatTime(timeLeft)}</span>
            <span>🔎 {foundClues}/{levelSettings[level].clues}</span>
            <span>⭐ {score} pts</span> {/* ✅ live score */}
            <Button
              onClick={useHint}
              disabled={hintsLeft <= 0}
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg text-sm md:text-base"
            >
              <FaLightbulb /> {hintsLeft}
            </Button>
          </div>

          {/* Game Scene */}
          <div className="relative w-full max-w-6xl h-[87vh] mx-auto aspect-[16/9]">
            <img
              ref={imgRef}
              src={levelSettings[level].bg}
              alt="scene"
              className="absolute inset-0 w-full h-full object-contain"
            />
            {clues.map((clue) => {
              const img = imgRef.current;
              let top = 0, left = 0;
              if (img) {
                const rect = img.getBoundingClientRect();
                top = (clue.yPercent / 100) * rect.height;
                left = (clue.xPercent / 100) * rect.width;
              }
              return (
                <motion.div
                  key={clue.id}
                  onClick={() => handleClueClick(clue.id)}
                  className={`absolute w-6 h-6 md:w-20 md:h-20 cursor-pointer  ${
                    clue.found ? "bg-green-600/90" : "bg-red-600/60"
                  }`}
                  style={{ top, left }}
                  animate={activeHint === clue.id ? { scale: [1, 1.5, 1] } : {}}
                />
              );
            })}
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
            {foundClues === levelSettings[level].clues ? "🎉 You Win!" : "💀 Game Over"}
          </h2>
          <p className="text-yellow-100 text-lg md:text-xl mb-2">
            Found {foundClues}/{levelSettings[level].clues} clues
          </p>
          <p className="text-yellow-200 text-lg md:text-2xl font-bold mb-8">
            {console.log(`information username-${username} level-${level} score-${score} time:${levelSettings[level].time-timeLeft}s`)}
            {saveBestScore(username, level, score,levelSettings[level].time-timeLeft)}
            {username}, your score: ⭐ {score} pts
          </p>
          <div className="flex gap-4">
            <Button
              onClick={restart}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold"
            >
              Restart
            </Button>
            <Button
              onClick={onQuit}
              className="bg-red-600 hover:bg-red-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold"
            >
              Quit
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
