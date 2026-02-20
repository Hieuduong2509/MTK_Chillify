import type { PlaybackStrategy } from "./PlaybackStrategy";
import type { Song } from "../../../assets/dummyDB";

export class NormalPlaybackStrategy implements PlaybackStrategy {
  getNextIndex(currentIndex: number, playlist: Song[]): number {
    if (playlist.length === 0) return -1;
    return (currentIndex + 1) % playlist.length;
  }

  getPreviousIndex(currentIndex: number, playlist: Song[]): number {
    if (playlist.length === 0) return -1;
    return (currentIndex - 1 + playlist.length) % playlist.length;
  }
}
