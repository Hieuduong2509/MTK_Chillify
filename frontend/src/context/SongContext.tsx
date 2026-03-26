import React, { createContext, useContext, useState } from "react";
import { apiRequest } from "../api/api";

interface Song {
  id: string;
  title: string;
  artist: string;
  image: string;
  audioUrl: string;
}

interface SongContextType {
  loading: boolean;
  songsByType: Record<string, Song[]>;
  currentSong: Song | null;
  getSongsByType: (type: string) => Promise<void>;
  getSongDetail: (id: string) => Promise<void>;
}

const mapSong = (s: any): Song => ({
  id: s.songId,
  title: s.name,
  artist: s.artistName,
  image: s.songImage,
  audioUrl: s.audioUrl,
});

const SongContext = createContext<SongContextType | undefined>(undefined);

export const SongProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [songsByType, setSongsByType] = useState<Record<string, Song[]>>({});
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  // ===== GET SONG DETAIL =====
  const getSongDetail = async (id: string) => {
    setLoading(true);

    try {
      const res = await apiRequest("song", `/${id}`, {
        method: "GET",
      });

      const mappedSong = mapSong(res);

      setCurrentSong(mappedSong);
    } catch (err: any) {
      console.error(err);
      setCurrentSong(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ===== GET SONGS BY TYPE =====
  const getSongsByType = async (type: string) => {
    setLoading(true);

    try {
      const res = await apiRequest("song", `/song-section`, {
        method: "GET",
        params: { type },
      });

      const mappedSongs = res.map((s: any) => mapSong(s));

      setSongsByType((prev) => ({
        ...prev,
        [type]: mappedSongs,
      }));
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SongContext.Provider
      value={{
        songsByType,
        loading,
        getSongsByType,
        currentSong,
        getSongDetail,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const useSong = () => {
  const context = useContext(SongContext);
  if (!context) throw new Error("useSong must be used inside SongProvider");
  return context;
};
