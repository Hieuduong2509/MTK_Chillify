import type { Song } from "../../assets/dummyDB";

export type PlayerState = "playing" | "paused" | "stopped";

export interface PlayerSnapshot {
  currentSong: Song | null;
  state: PlayerState;
  currentTime: number;
  duration: number;
  playlist: Song[];
}
