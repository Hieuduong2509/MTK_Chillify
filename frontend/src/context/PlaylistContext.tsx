import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { apiRequest } from '../api/api'; 

interface Song {
  songId: string;
  name: string;
  artistName?: string;
  audioUrl?: string;
  songImage?: string;
  duration?: string;
}

interface Playlist {
  id: string;
  playlistName: string;
  description?: string;
  playlistType: string;
  songs?: Song[];
  songCount?: number;
}

interface PlaylistContextType {
  playlists: Playlist[];
  currentPlaylist: Playlist | null;
  loading: boolean;
  
  likedSongIds: string[]; 
  likedSongsData: any[]; // 1. ĐÃ FIX: Khai báo thêm dữ liệu này để TS không báo lỗi
  toggleLikeSong: (songId: string) => Promise<void>; 

  fetchPlaylists: () => Promise<void>;
  fetchPlaylistDetail: (id: string) => Promise<void>;
  createPlaylist: (name: string, desc: string) => Promise<void>;
  updatePlaylist: (id: string, name: string, desc: string) => Promise<void>;
  deletePlaylist: (id: string) => Promise<void>;
  removeSongFromPlaylist: (playlistId: string, songId: string) => Promise<void>;
  addSongToPlaylist: (playlistId: string, songId: string) => Promise<void>;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export const PlaylistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState(false);

  const [likedSongIds, setLikedSongIds] = useState<string[]>([]);
  const [likedSongsData, setLikedSongsData] = useState<any[]>([]);

  const fetchPlaylists = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiRequest<Playlist[]>('playlist', '');
      setPlaylists(data);
    } catch (error) { console.error(error); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchPlaylists();
    }
  }, [fetchPlaylists]); 

  const likedPlaylist = playlists.find(p => p.playlistType === 'LIKED' || p.playlistName === 'Liked Songs');

  useEffect(() => {
    const fetchLikedSongs = async () => {
      if (likedPlaylist && localStorage.getItem("token")) {
        try {
          const songs = await apiRequest<any[]>('playlist', `/${likedPlaylist.id}/liked-songs`);
          setLikedSongIds(songs.map((s: any) => s.songId));
          setLikedSongsData(songs); 
        } catch (error) { 
          console.error("Lỗi lấy danh sách bài hát yêu thích:", error); 
        }
      }
    };
    fetchLikedSongs();
  }, [likedPlaylist]); 

  // 2. ĐÃ FIX: Dời hàm removeSongFromPlaylist lên trên này để toggleLikeSong gọi được
  const removeSongFromPlaylist = async (playlistId: string, songId: string) => {
    try {
      await apiRequest('playlist', `/${playlistId}/songs/${songId}`, { method: 'DELETE' });
      
      await fetchPlaylists(); 
      if (currentPlaylist?.id === playlistId) {
        setCurrentPlaylist({
          ...currentPlaylist,
          songs: currentPlaylist.songs?.filter(s => s.songId !== songId)
        });
      }
    } catch (error) { 
      console.error(error); 
    }
  };

  const toggleLikeSong = async (songId: string) => {
    if (!likedPlaylist) {
      alert("Hệ thống chưa tạo Playlist 'Liked Songs' cho tài khoản của bạn!");
      return;
    }

    const isLiked = likedSongIds.includes(songId);

    try {
      if (isLiked) {
        await removeSongFromPlaylist(likedPlaylist.id, songId); // Giờ gọi vô tư không bị sập nữa
        setLikedSongIds(prev => prev.filter(id => id !== songId));
      } else {
        await apiRequest('playlist', `/${likedPlaylist.id}/songs/${songId}`, { method: 'POST' });
        await fetchPlaylists(); 
        setLikedSongIds(prev => [...prev, songId]);
      }
    } catch (error) {
      console.error("Lỗi khi thay đổi trạng thái yêu thích:", error);
    }
  };

  // 3. ĐÃ FIX: Bọc useCallback để chống lỗi render vô hạn ở PlaylistDetail
  const fetchPlaylistDetail = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const data = await apiRequest<Playlist>('playlist', `/${id}`);
      setCurrentPlaylist(data);
    } catch (error) { console.error(error); }
    finally { setLoading(false); }
  }, []);

  const addSongToPlaylist = async (playlistId: string, songId: string) => {
    try {
      await apiRequest('playlist', `/${playlistId}/songs/${songId}`, { 
        method: 'POST' 
      });
      await fetchPlaylists();
      if (currentPlaylist?.id === playlistId) {
        await fetchPlaylistDetail(playlistId);
      }
    } catch (error) {
      console.error("Lỗi thêm bài hát:", error);
      alert("Bài hát đã có trong playlist!");
    }
  };

  const createPlaylist = async (playlistName: string, description: string) => {
    try {
      await apiRequest('playlist', '', { method: 'POST', body: { playlistName, description } });
      await fetchPlaylists();
    } catch (error) { console.error(error); }
  };

  const updatePlaylist = async (id: string, playlistName: string, description: string) => {
    try {
      await apiRequest('playlist', `/${id}`, { method: 'PUT', body: { playlistName, description } });
      await fetchPlaylists();
    } catch (error) { console.error(error); }
  };

  const deletePlaylist = async (id: string) => {
    try {
      await apiRequest('playlist', `/${id}`, { method: 'DELETE' });
      setPlaylists(prev => prev.filter(p => p.id !== id));
    } catch (error) { console.error(error); }
  };

  return (
    <PlaylistContext.Provider value={{ 
      playlists, currentPlaylist, loading, 
      
      likedSongIds, likedSongsData, toggleLikeSong, 
      
      fetchPlaylists, fetchPlaylistDetail, createPlaylist, 
      updatePlaylist, deletePlaylist, removeSongFromPlaylist,
      addSongToPlaylist 
    }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (!context) throw new Error("usePlaylist must be used within PlaylistProvider");
  return context;
};