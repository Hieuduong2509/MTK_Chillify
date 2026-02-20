import type { PlaybackStrategy } from "./PlaybackStrategy";
import type { Song } from "../../../assets/dummyDB";

export class ShufflePlaybackStrategy implements PlaybackStrategy {
  getNextIndex(currentIndex: number, playlist: Song[]): number {
    if (playlist.length <= 1) return currentIndex;

    let nextIndex = currentIndex;
    while (nextIndex === currentIndex) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    }
    return nextIndex;
  }

  getPreviousIndex(currentIndex: number, playlist: Song[]): number {

    return this.getNextIndex(currentIndex, playlist);
  }
}
