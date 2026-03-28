import type { Song } from "../../assets/dummyDB";
import type { PlayerObserver } from "./PlayerObserver";
import type { PlayerState } from "./PlayerTypes";
import type { PlaybackStrategy } from "./strategies/PlaybackStrategy";
import { NormalPlaybackStrategy } from "./strategies/NormalPlaybackStrategy";
import { ShufflePlaybackStrategy } from "./strategies/ShufflePlaybackStrategy";
import { RepeatOneStrategy } from "./strategies/RepeatOneStrategy";
import { apiRequest } from "../../api/api";

class Player {
  private currentSong: Song | null = null;
  private state: PlayerState = "stopped";
  private currentTime = 0;
  private duration = 0;
  private playlist: Song[] = [];

  private currentIndex: number = -1;
  private playbackStrategy: PlaybackStrategy = new NormalPlaybackStrategy();
  private observers: Set<PlayerObserver> = new Set();
  private volume = 0.7;
  private mode: "normal" | "shuffle" | "repeat" = "normal";

  private hasCountedPlay: boolean = false;
  private isTransitioning: boolean = false;

  private sessionPlayCounts: Record<string, number> = {};

  private audio: HTMLAudioElement;

  constructor() {
    this.audio = new Audio();
    this.audio.volume = this.volume;
    this.audio.preload = "auto";

    this.audio.addEventListener("timeupdate", () => {
      this.currentTime = this.audio.currentTime;
      this.notifyTimeChange();

      if (this.duration > 0) {
        const halfDuration = this.duration / 2;
        
        if (this.currentTime >= halfDuration && !this.hasCountedPlay && this.currentSong) {
          this.hasCountedPlay = true; 
          this.increasePlayCount(this.currentSong.id);
          
          const baseViews = (this.currentSong as any).playCount || (this.currentSong as any).songPlayHistories?.length || 0;
          const currentViews = this.sessionPlayCounts[this.currentSong.id] !== undefined 
            ? this.sessionPlayCounts[this.currentSong.id] 
            : baseViews;
          
          console.log(`=========================================`);
          console.log(`[PLAY COUNT] Đã nghe qua 50% bài hát (${halfDuration.toFixed(1)}s)`);
          console.log(`[PLAY COUNT] GỌI API CỘNG VIEW -> View dự kiến: ${currentViews + 1}`);
          console.log(`=========================================`);
        }
      }

      if (this.duration > 0 && this.currentTime >= this.duration - 0.2) {
        if (!this.isTransitioning) {
          this.isTransitioning = true;
          this.next();
        }
      }
    });

    this.audio.addEventListener("loadedmetadata", () => {
      this.duration = this.audio.duration;
      this.notifyTimeChange();
    });

    this.audio.addEventListener("ended", () => {
      if (!this.isTransitioning) {
        this.isTransitioning = true;
        this.next();
      }
    });

    this.audio.addEventListener("play", () => {
      this.state = "playing";
      this.notifyStateChange();
    });

    this.audio.addEventListener("pause", () => {
      if (this.state !== "stopped") {
        this.state = "paused";
        this.notifyStateChange();
      }
    });

    this.audio.addEventListener("error", () => {});
  }

  private async increasePlayCount(songId: string) {
    if (!localStorage.getItem("token")) return;
    try {
      await apiRequest("player", `/songs/${songId}/played`, { method: "POST" });
      
      const baseViews = this.currentSong ? ((this.currentSong as any).playCount || (this.currentSong as any).songPlayHistories?.length || 0) : 0;
      const currentViews = this.sessionPlayCounts[songId] !== undefined ? this.sessionPlayCounts[songId] : baseViews;
      
      this.sessionPlayCounts[songId] = currentViews + 1;

      console.log(`[API SUCCESS] Đã lưu 1 view mới. Tổng view hiện tại trong máy: ${this.sessionPlayCounts[songId]}`);
    } catch (error) {
      console.error(`[API LỖI] Không thể lưu view vào DB:`, error);
    }
  }

  subscribe(observer: PlayerObserver) {
    this.observers.add(observer);
    observer.onSongChange(this.currentSong);
    observer.onStateChange(this.state);
    observer.onTimeChange(this.currentTime, this.duration);
    observer.onVolumeChange?.(this.volume);
  }

  unsubscribe(observer: PlayerObserver) {
    this.observers.delete(observer);
  }

  private notifySongChange() {
    this.observers.forEach((o) => o.onSongChange(this.currentSong));
  }

  private notifyStateChange() {
    this.observers.forEach((o) => o.onStateChange(this.state));
  }

  private notifyTimeChange() {
    this.observers.forEach((o) => o.onTimeChange(this.currentTime, this.duration));
  }

  private notifyVolumeChange() {
    this.observers.forEach((o) => o.onVolumeChange?.(this.volume));
  }

  setStrategy(strategy: PlaybackStrategy) {
    this.playbackStrategy = strategy;
  }

  getState() {
    return this.state;
  }

  getPlaylist() {
    return this.playlist;
  }

  getCurrentIndex() {
    return this.currentIndex;
  }

  loadPlaylist(playlist: Song[]) {
    this.playlist = playlist;
    this.currentIndex = playlist.length > 0 ? 0 : -1;
  }

  setShuffleMode(isShuffle: boolean) {
    if (isShuffle) {
      this.mode = "shuffle";
      this.playbackStrategy = new ShufflePlaybackStrategy();
    } else {
      this.mode = "normal";
      this.playbackStrategy = new NormalPlaybackStrategy();
    }
  }

  setRepeatOneMode(isRepeat: boolean) {
    if (isRepeat) {
      this.mode = "repeat";
      this.playbackStrategy = new RepeatOneStrategy();
    } else {
      this.mode = "normal";
      this.playbackStrategy = new NormalPlaybackStrategy();
    }
  }

  play(song?: Song) {
    this.isTransitioning = false;

    if (song) {
      if (!this.currentSong || String(this.currentSong.id) !== String(song.id)) {
        this.currentIndex = this.playlist.findIndex((s) => String(s.id) === String(song.id));
        this.currentSong = song;
        
        this.hasCountedPlay = false;

        const baseViews = (song as any).playCount || (song as any).songPlayHistories?.length || 0;
        const currentViews = this.sessionPlayCounts[song.id] !== undefined ? this.sessionPlayCounts[song.id] : baseViews;
        
        console.log(`[PLAY COUNT] Bắt đầu phát: ${song.title} | Lượt nghe đã có: ${currentViews}`);

        const targetAudioUrl = (song as any).audioUrl || (song as any).audio || "";
        if (this.audio.src !== targetAudioUrl && this.audio.src !== window.location.origin + targetAudioUrl) {
          this.audio.src = targetAudioUrl;
          this.audio.load();
        }

        this.notifySongChange();
      } else {
        if (this.audio.currentTime >= this.audio.duration - 0.5 || this.audio.ended) {
          this.audio.currentTime = 0;
          this.hasCountedPlay = false;
        }
      }
    } else if (!this.currentSong && this.playlist.length > 0) {
      this.currentIndex = 0;
      this.currentSong = this.playlist[0];
      this.hasCountedPlay = false;

      const targetAudioUrl = (this.currentSong as any).audioUrl || (this.currentSong as any).audio || "";
      if (this.audio.src !== targetAudioUrl && this.audio.src !== window.location.origin + targetAudioUrl) {
        this.audio.src = targetAudioUrl;
        this.audio.load();
      }
      this.notifySongChange();
    }

    if (!this.currentSong) return;

    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }

  pause() {
    this.audio.pause();
  }

  setVolume(vol: number) {
    const normalized = Math.max(0, Math.min(vol, 1));
    this.volume = normalized;
    this.audio.volume = this.volume;
    this.notifyVolumeChange();
  }

  stop() {
    if (this.state === "stopped") return;
    this.state = "stopped";
    this.audio.pause();
    this.audio.currentTime = 0;
    this.currentTime = 0;
    this.currentSong = null;
    this.hasCountedPlay = false;
    this.isTransitioning = false;

    this.notifySongChange();
    this.notifyStateChange();
    this.notifyTimeChange();
  }

  seek(time: number) {
    const normalized = Math.max(0, Math.min(time, this.duration));
    this.audio.currentTime = normalized;
  }

  previous() {
    if (this.playlist.length === 0 || this.currentIndex < 0) return;
    const prevIndex = this.playbackStrategy.getPreviousIndex(this.currentIndex, this.playlist);
    if (prevIndex < 0) return;
    this.currentIndex = prevIndex;
    this.play(this.playlist[this.currentIndex]);
  }

  next() {
    if (this.mode === "repeat" && this.currentSong) {
      this.audio.currentTime = 0;
      this.hasCountedPlay = false;
      this.isTransitioning = false;
      console.log(`[PLAY COUNT] Bài hát lặp lại (Repeat). Đã reset cờ, sẵn sàng đếm view mới khi qua 50%!`);
      this.audio.play().catch(console.error);
      return;
    }

    if (this.playlist.length === 0 || this.currentIndex < 0) {
      this.stop();
      return;
    }

    const nextIndex = this.playbackStrategy.getNextIndex(
      this.currentIndex,
      this.playlist,
    );

    if (nextIndex < 0) {
      this.stop();
      return;
    }

    if (nextIndex === this.currentIndex) {
      this.audio.currentTime = 0;
      this.hasCountedPlay = false;
      this.isTransitioning = false;
      console.log(`[PLAY COUNT] Bài hát lặp lại. Đã reset cờ, sẵn sàng đếm view mới khi qua 50%!`);
      this.audio.play().catch(console.error);
      return;
    }

    this.currentIndex = nextIndex;
    this.play(this.playlist[this.currentIndex]);
  }
}

export const player = new Player();