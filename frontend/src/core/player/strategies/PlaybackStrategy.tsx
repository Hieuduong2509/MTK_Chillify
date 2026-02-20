import type { Song } from "../../../assets/dummyDB";

export interface PlaybackStrategy {
  getNextIndex(
    currentIndex: number,
    playlist: Song[]
  ): number;

  getPreviousIndex(
    currentIndex: number,
    playlist: Song[]
  ): number;
}
