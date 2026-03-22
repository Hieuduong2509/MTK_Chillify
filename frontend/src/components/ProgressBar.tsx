import React, { useEffect, useState } from "react";
import { player } from "../core/player/Player";
import type { PlayerObserver } from "../core/player/PlayerObserver";
import type { Song } from "../assets/dummyDB";

const ProgressBar = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [playerState, setPlayerState] = useState<
    "playing" | "paused" | "stopped"
  >("stopped");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);
  const [lastVolume, setLastVolume] = useState(0.7);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  useEffect(() => {
    const observer: PlayerObserver = {
      onSongChange: (song) => setCurrentSong(song),
      onStateChange: (state) => setPlayerState(state),
      onTimeChange: (time, dur) => {
        setCurrentTime(time);
        setDuration(dur);
      },
      onVolumeChange: (vol) => setVolume(vol),
    };

    player.subscribe(observer);
    return () => player.unsubscribe(observer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingVolume) return;

      const volumeBar = document.getElementById("volume-bar");
      if (!volumeBar) return;

      const rect = volumeBar.getBoundingClientRect();
      let percent = (e.clientX - rect.left) / rect.width;

      percent = Math.max(0, Math.min(1, percent));

      player.setVolume(percent);
    };

    const handleMouseUp = () => {
      setIsDraggingVolume(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingVolume]);

  if (!currentSong) return null;

  const formatTime = (time: number) => {
    const safe = Math.floor(time);
    return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, "0")}`;
  };

  const progressPercent = duration === 0 ? 0 : (currentTime / duration) * 100;

  const volumePercent = volume * 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-[#0f172a] px-6 py-4 lg:py-0 flex flex-col lg:flex-row justify-between z-50">
      {/* ========= DESKTOP ========= */}
      <div className="hidden lg:flex w-full items-center justify-between">
        {/* LEFT - SONG INFO */}
        <div className="flex items-center gap-4 w-1/4 min-w-[220px]">
          <img
            src={currentSong.image}
            alt={currentSong.title}
            className="w-14 h-14 rounded-md object-cover"
          />

          <div>
            <p className="text-white text-sm font-semibold">
              {currentSong.title}
            </p>
            <p className="text-xs text-gray-400">{currentSong.artist}</p>
          </div>

          <span className="material-symbols-outlined text-gray-400 text-xl cursor-pointer hover:text-primary transition-all duration-300">
            favorite_border
          </span>
        </div>

        {/* CENTER - CONTROLS + PROGRESS */}
        <div className="flex flex-col items-center w-2/4 max-w-2xl">
          {/* CONTROLS */}
          <div className="flex items-center gap-6 mb-2">
            {/* SHUFFLE */}
            <button
              onClick={() => {
                setIsShuffle(!isShuffle);
                setIsRepeat(false);
                player.toggleShuffle();
              }}
              className={`transition ${
                isShuffle
                  ? "text-blue-500"
                  : "text-gray-400 hover:text-white cursor-pointer"
              }`}
              title="Shuffle"
            >
              <span className="material-symbols-outlined text-xl">shuffle</span>
            </button>

            {/* PREVIOUS */}
            <button
              onClick={() => player.previous()}
              className="text-gray-400 hover:text-white transition cursor-pointer"
              title="Previous Song"
            >
              <span className="material-symbols-outlined text-2xl">
                skip_previous
              </span>
            </button>

            {/* PLAY */}
            <button
              onClick={() => player.play()}
              disabled={playerState === "playing"}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md disabled:opacity-40 hover:scale-105 transition-transform cursor-pointer"
              title="Play"
            >
              <span className="material-symbols-outlined text-black">
                play_arrow
              </span>
            </button>

            {/* PAUSE */}
            <button
              onClick={() => player.pause()}
              disabled={playerState !== "playing"}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md disabled:opacity-40 hover:scale-105 transition-transform cursor-pointer"
              title="Pause"
            >
              <span className="material-symbols-outlined text-black">
                pause
              </span>
            </button>

            {/* STOP */}
            <button
              onClick={() => player.stop()}
              disabled={playerState === "stopped"}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md disabled:opacity-40 hover:scale-105 transition-transform cursor-pointer"
              title="Stop"
            >
              <span className="material-symbols-outlined text-black">stop</span>
            </button>

            {/* NEXT */}
            <button
              onClick={() => player.next()}
              className="text-gray-400 hover:text-white transition cursor-pointer"
              title="Next Song"
            >
              <span className="material-symbols-outlined text-2xl">
                skip_next
              </span>
            </button>

            {/* REPEAT ONE */}
            <button
              onClick={() => {
                setIsRepeat(!isRepeat);
                setIsShuffle(false);
                player.toggleRepeatOne();
              }}
              className={`transition ${
                isRepeat
                  ? "text-blue-500"
                  : "text-gray-400 hover:text-white cursor-pointer"
              }`}
              title="Repeat"
            >
              <span className="material-symbols-outlined text-xl">
                repeat_one
              </span>
            </button>
          </div>

          {/* PROGRESS BAR */}
          <div className="flex items-center gap-3 w-full">
            <span className="text-xs text-gray-400 w-10 text-right">
              {formatTime(currentTime)}
            </span>

            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                player.seek(percent * duration);
              }}
              className="flex-1 h-1 bg-gray-700 rounded-full relative cursor-pointer"
            >
              <div
                className="absolute left-0 top-0 h-full bg-blue-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <span className="text-xs text-gray-400 w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* RIGHT - QUEUE + VOLUME + CLOSE */}
        <div className="flex items-center gap-5 w-1/4 justify-end min-w-[220px]">
          {/* Lyrics */}
          <span
            className="material-symbols-outlined text-gray-400 cursor-pointer hover:text-white transition"
            title="Lyrics"
          >
            lyrics
          </span>

          {/* Queue */}
          <span
            className="material-symbols-outlined text-gray-400 cursor-pointer hover:text-white transition"
            title="Queue"
          >
            queue_music
          </span>

          {/* Volume */}
          <span
            onClick={() => {
              if (volume > 0) {
                setLastVolume(volume);
                player.setVolume(0);
              } else {
                player.setVolume(lastVolume || 0.7);
              }
            }}
            className="material-symbols-outlined text-gray-400 cursor-pointer hover:text-white transition"
            title="Volume"
          >
            {volume === 0
              ? "volume_off"
              : volume < 0.4
                ? "volume_down"
                : "volume_up"}
          </span>

          <div
            id="volume-bar"
            onMouseDown={(e) => {
              setIsDraggingVolume(true);

              const rect = e.currentTarget.getBoundingClientRect();
              let percent = (e.clientX - rect.left) / rect.width;
              percent = Math.max(0, Math.min(1, percent));

              player.setVolume(percent);
            }}
            className="relative w-28 h-1 bg-gray-700 rounded-full cursor-pointer group"
          >
            {/* Filled bar */}
            <div
              className="absolute left-0 top-0 h-full bg-blue-500 rounded-full"
              style={{ width: `${volumePercent}%` }}
            />

            {/* Thumb */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition"
              style={{ left: `calc(${volumePercent}% - 6px)` }}
            />
          </div>

          {/* CLOSE BUTTON */}
          <button
            onClick={() => player.stop()}
            className="text-gray-400 hover:text-white transition cursor-pointer"
            title="Close Player"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>
      </div>

      {/* ========= TABLET + MOBILE ========= */}
      <div className="flex flex-col gap-3 lg:hidden">
        {/* TOP */}
        <div className="flex items-center justify-between">
          {/* LEFT - SONG INFO */}
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={currentSong.image}
              className="w-12 h-12 rounded-md object-cover"
            />

            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">
                {currentSong.title}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {currentSong.artist}
              </p>
            </div>
          </div>

          {/* RIGHT - ICONS */}
          <div className="flex items-center gap-4">
            {/* Favourite */}
            <span className="material-symbols-outlined text-gray-400">
              favorite_border
            </span>

            {/* Add to playlist */}
            <span className="material-symbols-outlined text-gray-400">add</span>

            {/* Play - Pause */}
            <button
              onClick={() => {
                if (playerState === "playing") {
                  player.pause();
                } else {
                  player.play();
                }
              }}
            >
              <span className="material-symbols-outlined mt-2">
                {playerState === "playing" ? "pause" : "play_arrow"}
              </span>
            </button>

            {/* Stop */}
            <button
              onClick={() => {
                player.stop();
              }}
            >
              <span className="material-symbols-outlined mt-2">stop</span>
            </button>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex items-center gap-3 w-full">
          <span className="text-xs w-8 text-right">
            {formatTime(currentTime)}
          </span>

          <div className="flex-1 h-1 bg-gray-700 rounded-full relative">
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                player.seek(percent * duration);
              }}
              className="absolute left-0 top-0 h-full bg-blue-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <span className="text-xs w-8">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
