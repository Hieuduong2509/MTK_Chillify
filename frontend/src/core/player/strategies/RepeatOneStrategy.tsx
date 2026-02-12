import type { PlaybackStrategy } from "./PlaybackStrategy";
import type { Song } from "../../../assets/dummyDB";

export class RepeatOneStrategy implements PlaybackStrategy {
  getNextIndex(currentIndex: number, _playlist: Song[]): number {
    return currentIndex;
  }

  getPreviousIndex(currentIndex: number, _playlist: Song[]): number {
    return currentIndex;
  }
}
