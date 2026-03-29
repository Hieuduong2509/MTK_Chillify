import React, { useEffect, useState, useRef, useMemo } from "react";
import { player } from "../../core/player/Player";
import type { PlayerObserver } from "../../core/player/PlayerObserver";
import type { Song } from "../../assets/dummyDB";
import { NextCommand } from "../../core/player/commands/NextCommand";
import { PreviousCommand } from "../../core/player/commands/PreviousCommand";
import { usePlaylist } from "../../context/PlaylistContext";

import { lyricProcessor, type LyricLine } from "../../core/player/strategies/LyricParser";

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

  const { likedSongIds, toggleLikeSong } = usePlaylist();
  const isLiked = currentSong ? likedSongIds.includes(currentSong.id) : false;

  const [showQueue, setShowQueue] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);


  const [autoLyrics, setAutoLyrics] = useState<string>("");
  const [isFetchingLyrics, setIsFetchingLyrics] = useState(false);

  useEffect(() => {
    const fetchLyrics = async () => {
      if (!currentSong) return;

      setAutoLyrics("");
      setIsFetchingLyrics(true);
      
      const dbLyrics = 
        (currentSong as any).lyrics || 
        (currentSong as any).originalData?.lyrics || 
        (currentSong as any).Lyrics ||
        (currentSong as any).originalData?.Lyrics;

      if (dbLyrics && dbLyrics.trim() !== "") {
        setAutoLyrics(dbLyrics);
        setIsFetchingLyrics(false);
        return;
      }

      try {
        const title = encodeURIComponent(currentSong.title);
        const artist = encodeURIComponent(currentSong.artist || "");

        //TEST
        //const title = encodeURIComponent("Shape of You");
        //const artist = encodeURIComponent("Ed Sheeran");


        const res = await fetch(`https://lrclib.net/api/get?track_name=${title}&artist_name=${artist}`);
        if (res.ok) {
          const data = await res.json();
          const fetchedLyrics = data.syncedLyrics || data.plainLyrics || "";
          setAutoLyrics(fetchedLyrics);
        } else {
          setAutoLyrics("");
        }
      } catch (error) {
        console.error("Lỗi khi đi xin lời bài hát:", error);
      } finally {
        setIsFetchingLyrics(false);
      }
    };

    fetchLyrics();
  }, [currentSong]);

  // Phân tích lời bài hát 1 lần
  const parsedLyrics = useMemo(() => lyricProcessor.process(autoLyrics), [autoLyrics]);

  // Tính toán dòng nào đang hát
  const activeIndex = useMemo(() => {
    if (parsedLyrics.length === 0 || parsedLyrics[0].time === 0) return -1;
    let idx = -1;
    for (let i = 0; i < parsedLyrics.length; i++) {
      if (currentTime >= parsedLyrics[i].time) {
        idx = i;
      } else {
        break; 
      }
    }
    return idx;
  }, [currentTime, parsedLyrics]);

  const activeLyricRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (showLyrics && activeLyricRef.current) {
      activeLyricRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeIndex, showLyrics]);

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

  const nextCommand = new NextCommand();
  const previousCommand = new PreviousCommand();

  const playlist = typeof (player as any).getPlaylist === 'function' ? (player as any).getPlaylist() : [];
  const currentIdx = typeof (player as any).getCurrentIndex === 'function' ? (player as any).getCurrentIndex() : -1;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-[#0f172a] px-6 py-4 lg:py-0 flex flex-col lg:flex-row justify-between z-50">
      {/* ========= DESKTOP ========= */}
      <div className="hidden lg:flex w-full items-center justify-between">
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

          <button
            title={isLiked ? "Unlike this song" : "Like this song"}
            onClick={() => {
              if (currentSong) toggleLikeSong(currentSong.id);
            }}
            className={`flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer
                      ${isLiked ? "text-primary scale-110" : "text-gray-400 hover:text-primary"}`}
          >
            <span className={`material-symbols-outlined text-2xl`}>
              favorite
            </span>
          </button>
        </div>

        {/* CENTER - CONTROLS + PROGRESS */}
        <div className="flex flex-col items-center w-2/4 max-w-2xl">
          <div className="flex items-center gap-6 mb-2">
            <button
              onClick={() => {
                const newValue = !isShuffle;
                setIsShuffle(newValue);
                if (newValue) {
                  setIsRepeat(false); 
                }
                player.setShuffleMode(newValue); 
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

            <button
              onClick={() => previousCommand.execute()}
              className="text-gray-400 hover:text-white transition cursor-pointer"
              title="Previous Song"
            >
              <span className="material-symbols-outlined text-2xl">
                skip_previous
              </span>
            </button>

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

            <button
              onClick={() => player.stop()}
              disabled={playerState === "stopped"}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md disabled:opacity-40 hover:scale-105 transition-transform cursor-pointer"
              title="Stop"
            >
              <span className="material-symbols-outlined text-black">stop</span>
            </button>

            <button
              onClick={() => nextCommand.execute()}
              className="text-gray-400 hover:text-white transition cursor-pointer"
              title="Next Song"
            >
              <span className="material-symbols-outlined text-2xl">
                skip_next
              </span>
            </button>

            <button
              onClick={() => {
                const newValue = !isRepeat;
                setIsRepeat(newValue);
                if (newValue) {
                  setIsShuffle(false); 
                }
                player.setRepeatOneMode(newValue); 
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
          <span
            onClick={() => {
              setShowLyrics(!showLyrics);
              setShowQueue(false); 
            }}
            className={`material-symbols-outlined cursor-pointer transition ${
              showLyrics ? "text-blue-500" : "text-gray-400 hover:text-white"
            }`}
            title="Lyrics"
          >
            lyrics
          </span>

          <span
            onClick={() => {
              setShowQueue(!showQueue);
              setShowLyrics(false); 
            }}
            className={`material-symbols-outlined cursor-pointer transition ${
              showQueue ? "text-blue-500" : "text-gray-400 hover:text-white"
            }`}
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
            <div
              className="absolute left-0 top-0 h-full bg-blue-500 rounded-full"
              style={{ width: `${volumePercent}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition"
              style={{ left: `calc(${volumePercent}% - 6px)` }}
            />
          </div>

          <button
            onClick={() => player.stop()}
            className="text-gray-400 hover:text-white transition cursor-pointer"
            title="Close Player"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {showQueue && (
          <div className="absolute bottom-[100px] right-6 w-80 max-h-96 bg-[#1e293b] rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] p-4 overflow-y-auto border border-gray-700 z-50">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-700">
              <h3 className="font-bold text-white">Queues</h3>
              <button onClick={() => setShowQueue(false)} className="text-gray-400 hover:text-white">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            
            <div className="flex flex-col gap-1">
              {playlist.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-4">Empty Queue</p>
              ) : (
                playlist.map((s: Song, idx: number) => {
                  const isPlaying = currentIdx === idx;
                  return (
                    <div 
                      key={idx} 
                      onClick={() => player.play(s)} 
                      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${isPlaying ? 'bg-blue-500/20' : 'hover:bg-white/5'}`}
                    >
                      <img src={s.image} alt={s.title} className="w-10 h-10 rounded object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm truncate font-medium ${isPlaying ? 'text-blue-500' : 'text-white'}`}>{s.title}</p>
                        <p className="text-xs text-gray-400 truncate">{s.artist}</p>
                      </div>
                      {isPlaying && <span className="material-symbols-outlined text-blue-500 text-sm">equalizer</span>}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* BẢNG LỜI BÀI HÁT (CÓ CHẠY THEO NHẠC)        */}
        {/* ========================================= */}
        {showLyrics && (
          <div className="absolute bottom-[100px] right-6 w-96 max-h-[500px] bg-[#1e293b]/95 backdrop-blur-md rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] p-6 overflow-hidden border border-gray-700 z-50 flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-700 shrink-0">
              <h3 className="font-bold text-white text-lg">Lời bài hát</h3>
              <button onClick={() => setShowLyrics(false)} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto hide-scrollbar scroll-smooth text-center pr-2" id="lyrics-container">
              {isFetchingLyrics ? (
                <div className="h-full flex flex-col items-center justify-center gap-4 opacity-70 mt-20">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm font-medium text-gray-300">Đang tìm lời bài hát cho<br/><strong className="text-white text-base mt-1 block">{currentSong.title}</strong></p>
                </div>
              ) : parsedLyrics.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-4 opacity-60 mt-20">
                  <span className="material-symbols-outlined text-6xl text-gray-500">music_off</span>
                  <p className="text-sm text-gray-300">Không tìm thấy lời bài hát cho<br/><strong className="text-white text-base mt-1 block">{currentSong.title}</strong></p>
                </div>
              ) : (
                <div className="py-24 flex flex-col gap-6">
                  {parsedLyrics.map((line: LyricLine, index: number) => {
                    const isActive = index === activeIndex;
                    return (
                      <p 
                        key={index} 
                        ref={isActive ? activeLyricRef : null}
                        className={`transition-all duration-500 ease-out font-medium leading-relaxed ${
                          isActive 
                            ? "text-blue-400 scale-[1.15] drop-shadow-[0_0_12px_rgba(96,165,250,0.6)] text-xl py-2" 
                            : "text-gray-400 opacity-50 hover:opacity-100 hover:text-gray-200 cursor-pointer text-base"
                        }`}
                        onClick={() => {
                          if (line.time > 0) player.seek(line.time);
                        }}
                      >
                        {line.text}
                      </p>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ========= TABLET + MOBILE ========= */}
      <div className="flex flex-col gap-3 lg:hidden">
        {/* TOP */}
        <div className="flex items-center justify-between">
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

          <div className="flex items-center gap-4">
            <button
              title={isLiked ? "Unlike this song" : "Like this song"}
              onClick={() => {
                if (currentSong) toggleLikeSong(currentSong.id);
              }}
              className={`flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer
                    ${isLiked ? "text-primary scale-110" : "text-gray-400 hover:text-primary"}`}
            >
              <span className={`material-symbols-outlined text-2xl`}>
                favorite
              </span>
            </button>

            <span className="material-symbols-outlined text-gray-400">add</span>

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