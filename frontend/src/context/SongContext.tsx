import React, { createContext, useContext, useState, useCallback } from "react";
import { apiRequest } from "../api/api"; // Đảm bảo đường dẫn đúng

// Cấu trúc chuẩn hóa cho bài hát trên giao diện
export interface FormattedSong {
  id: string;
  title: string;
  artist: string;
  image: string;
  duration?: number;
  originalData?: any; 
}

interface SongContextType {
  currentSong: any;
  setCurrentSong: (song: any) => void;

  homeSections: any[];
  sectionDetail: any | null;
  songDetail: FormattedSong | null;
  upNextSongs: FormattedSong[];
  loading: boolean;

  fetchHomeData: () => Promise<void>;
  fetchSectionDetail: (sectionId: string) => Promise<void>;
  fetchSongDetailData: (songId: string) => Promise<void>;
}

const SongContext = createContext<SongContextType | undefined>(undefined);

export const SongProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<any>(null);
  
  const [homeSections, setHomeSections] = useState<any[]>([]);
  const [sectionDetail, setSectionDetail] = useState<any | null>(null);
  const [songDetail, setSongDetail] = useState<FormattedSong | null>(null);
  const [upNextSongs, setUpNextSongs] = useState<FormattedSong[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const formatSong = (s: any): FormattedSong => ({
    id: s.songId,
    title: s.name,
    artist: s.artistName || 'Unknown Artist',
    image: s.songImage || 'https://placehold.co/400x400/1f2937/fff?text=No+Image',
    duration: s.duration,
    originalData: s
  });

  const fetchHomeData = useCallback(async () => {
    setLoading(true);
    try {
      const allSongs = await apiRequest<any[]>('song', '/songs');
      const formatted = allSongs.map(formatSong);
      
      setHomeSections([
        { id: 'trending', title: 'Trending Now', songs: formatted.slice(0, 6) },
        { id: 'for-you', title: 'For You', songs: formatted.slice(6, 12) }
      ]);
    } catch (error) {
      console.error("Lỗi fetchHomeData:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSectionDetail = useCallback(async (sectionId: string) => {
    setLoading(true);
    try {
      const data = await apiRequest<any[]>('song', `/song-section?type=${sectionId}`);
      const formatted = data.map(formatSong);
      
      setSectionDetail({
        id: sectionId,
        title: sectionId === 'trending' ? 'Trending Now' : 'For You',
        songs: formatted
      });
    } catch (error) {
      console.error("Lỗi fetchSectionDetail:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSongDetailData = useCallback(async (songId: string) => {
    setLoading(true);
    try {
      const [detailData, allSongsData] = await Promise.all([
        apiRequest<any>('song', `/${songId}`),
        apiRequest<any[]>('song', '/songs')
      ]);

      setSongDetail(formatSong(detailData));
      
      const nextSongs = allSongsData
        .filter(s => s.songId !== songId)
        .slice(0, 3)
        .map(formatSong);
        
      setUpNextSongs(nextSongs);
    } catch (error) {
      console.error("Lỗi fetchSongDetailData:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <SongContext.Provider value={{ 
      currentSong, setCurrentSong, 
      homeSections, sectionDetail, songDetail, upNextSongs, loading,
      fetchHomeData, fetchSectionDetail, fetchSongDetailData
    }}>
      {children}
    </SongContext.Provider>
  );
};

export const useSong = () => {
  const context = useContext(SongContext);
  if (!context) throw new Error("useSong phải nằm trong SongProvider");
  return context;
};

export default SongContext;