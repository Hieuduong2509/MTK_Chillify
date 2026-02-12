import type { Song } from "../../assets/dummyDB";
import type { PlayerState } from "./PlayerTypes";

export interface PlayerObserver {
  onSongChange(song: Song | null): void;
  onStateChange(state: PlayerState): void;
  onTimeChange(currentTime: number, duration: number): void;
  onVolumeChange?(volume: number): void;

}
