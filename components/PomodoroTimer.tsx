"use client";
import { useState, useEffect } from "react";
import { FaPlay, FaPause, FaStop, FaBell } from "react-icons/fa";

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isStudyMode, setIsStudyMode] = useState(true); // True for study, false for break
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    // Declare 'timer' variable inside useEffect, initialized as undefined
    let timer: NodeJS.Timeout | undefined;

    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      if (timer) {
        clearInterval(timer); // Clears the interval if the timer is not running
      }
    }

    // Switch to break mode after study session is complete
    if (timeLeft <= 0) {
      if (isStudyMode) {
        setSessionCount((prev) => prev + 1);
        if (sessionCount >= 3) {
          setTimeLeft(15 * 60); // Longer break after 4 sessions (15 minutes)
          setIsStudyMode(false);
          setSessionCount(0);
        } else {
          setTimeLeft(5 * 60); // Short break (5 minutes)
          setIsStudyMode(false);
        }
      } else {
        setIsStudyMode(true);
        setTimeLeft(25 * 60); // Reset to 25 minutes for study session
      }
    }

    // Cleanup: clear the interval when the component is unmounted or dependencies change
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isRunning, timeLeft, isStudyMode, sessionCount]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsStudyMode(true);
    setTimeLeft(25 * 60); // Reset to 25 minutes
    setSessionCount(0);
  };

  return (
    <div className="pomodoro-timer bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">
        {isStudyMode ? "Study Session" : "Break Time"}
      </h3>
      <div className="flex flex-col items-center space-y-4">
        <div className="text-3xl font-semibold">{formatTime(timeLeft)}</div>
        <div className="flex gap-4">
          <button
            onClick={toggleTimer}
            className="bg-blue-600 text-white p-2 rounded-full"
          >
            {isRunning ? <FaPause /> : <FaPlay />}
          </button>
          <button
            onClick={resetTimer}
            className="bg-red-600 text-white p-2 rounded-full"
          >
            <FaStop />
          </button>
        </div>
        {timeLeft <= 0 && !isRunning && (
          <div className="text-2xl text-yellow-500 flex items-center gap-2">
            <FaBell />
            Time’s up!
          </div>
        )}
      </div>
      <div className="p-4 border-l-4 border-blue-500 bg-gray-50 dark:bg-gray-800 mt-9">
        <p className="text-lg italic text-gray-700 dark:text-gray-300">
          &quot;Good students aim for good grades. Great students aim for
          understanding.&quot;
        </p>
        <p className="mt-2 text-right text-gray-600 dark:text-gray-400">
          — Maxime Lagacé
        </p>
      </div>
    </div>
  );
};

export default PomodoroTimer;
