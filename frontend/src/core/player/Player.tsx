import type { Song } from "../../assets/dummyDB";
import type { PlayerObserver } from "./PlayerObserver";
import type { PlayerState } from "./PlayerTypes";
import type { PlaybackStrategy } from "./strategies/PlaybackStrategy";
import { NormalPlaybackStrategy } from "./strategies/NormalPlaybackStrategy";
import { ShufflePlaybackStrategy } from "./strategies/ShufflePlaybackStrategy";
import { RepeatOneStrategy } from "./strategies/RepeatOneStrategy";


class Player {
  private currentSong: Song | null = null;
  private state: PlayerState = "stopped";
  private currentTime = 0;
  private duration = 0;
  private playlist: Song[] = [];

  private currentIndex: number = -1;
  private playbackStrategy: PlaybackStrategy =
  new NormalPlaybackStrategy();
  private observers: Set<PlayerObserver> = new Set();
  private timer: number | null = null;
  private volume = 0.7;
  private mode: "normal" | "shuffle" | "repeat" = "normal";

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
    this.observers.forEach((o) =>
      o.onTimeChange(this.currentTime, this.duration)
    );
  }
  private notifyVolumeChange() {
  this.observers.forEach((o) =>
    o.onVolumeChange?.(this.volume)
  );
}

  setStrategy(strategy: PlaybackStrategy) {
  this.playbackStrategy = strategy;
}
  getState() {
    return this.state;
  }
  loadPlaylist(playlist: Song[]) {
    this.playlist = playlist;
    this.currentIndex = playlist.length > 0 ? 0 : -1;
  }
  toggleShuffle() {
  if (this.mode === "shuffle") {
    this.mode = "normal";
    this.playbackStrategy = new NormalPlaybackStrategy();
  } else {
    this.mode = "shuffle";
    this.playbackStrategy = new ShufflePlaybackStrategy();
  }
}

toggleRepeatOne() {
  if (this.mode === "repeat") {
    this.mode = "normal";
    this.playbackStrategy = new NormalPlaybackStrategy();
  } else {
    this.mode = "repeat";
    this.playbackStrategy = new RepeatOneStrategy();
  }
}

  play(song?: Song) {

  if (song) {
    this.currentIndex = this.playlist.findIndex(
      s => s.id === song.id
    );

    this.currentSong = song;
    this.currentTime = 0;
    this.duration = 225;
    this.notifySongChange();
  }

  if(!this.currentSong && this.playlist.length > 0){
    this.currentIndex = 0;
    this.currentSong = this.playlist[0];
    this.currentTime= 0;
    this.duration = 255;
    this.notifySongChange();
  }

  if (!this.currentSong) return;

  if (this.state === "playing") return;

  this.state = "playing";
  this.notifyStateChange();
  this.startTimer();
  console.log("STATE:", this.state);
}


  pause() {
    if (this.state !== "playing") return;
    this.state = "paused";
    this.notifyStateChange();
    this.stopTimer();
    console.log("STATE:", this.state);
  }

  stop() {
    if (this.state === "stopped") return;

    this.state = "stopped";
    this.currentTime = 0;

    this.currentSong = null;
    this.notifySongChange(); 
    this.notifyStateChange();
    this.notifyTimeChange();
    this.stopTimer();
    console.log("STATE:", this.state);
  }

  seek(time: number) {
    const normalized = Math.floor(time);
    this.currentTime = Math.max(0, Math.min(normalized, this.duration));
    this.notifyTimeChange();
  }

  setVolume(vol: number) {
    const normalized = Math.max(0, Math.min(vol, 1));
    this.volume = normalized;
    this.notifyVolumeChange();
  }

  previous() {
  if (this.playlist.length === 0) return;
  if (this.currentIndex < 0) return;

  const prevIndex =
    this.playbackStrategy.getPreviousIndex(
      this.currentIndex,
      this.playlist
    );

  if (prevIndex < 0) return;

  this.currentIndex = prevIndex;
  this.play(this.playlist[this.currentIndex]);
}

  next() {
  if (this.playlist.length === 0) return;
  if (this.currentIndex < 0) return;

  const nextIndex =
    this.playbackStrategy.getNextIndex(
      this.currentIndex,
      this.playlist
    );

  if (nextIndex < 0) return;

  this.currentIndex = nextIndex;
  this.play(this.playlist[this.currentIndex]);
}

  private startTimer() {
    this.stopTimer();
    this.timer = window.setInterval(() => {
      if (this.state !== "playing") return;

      this.currentTime += 1;
      if (this.currentTime >= this.duration) {
        this.currentTime = 0;
        this.next();
      } else {
        this.notifyTimeChange();
      }
    }, 1000);
  }

  private stopTimer() {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}


export const player = new Player();
