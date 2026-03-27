import { useEffect, useState } from "react";
import { usePlaylist } from "../../context/PlaylistContext";
import { apiRequest } from "../../api/api";
import SongCard from "../../components/song/SongCard"; 

const LikedSongsScreen = () => {
  const { playlists } = usePlaylist();
  const [likedSongsData, setLikedSongsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const likedPlaylist = playlists.find(p => p.playlistType === 'LIKED' || p.playlistName === 'Liked Songs');

  useEffect(() => {
    const getLikedSongsDetail = async () => {
      if (!likedPlaylist) { setLoading(false); return; }
      
      try {
        setLoading(true);
        const songs = await apiRequest<any[]>('playlist', `/${likedPlaylist.id}/liked-songs`);
        setLikedSongsData(songs);
      } catch (error) { console.error(error); }
      finally { setLoading(false); }
    };

    getLikedSongsDetail();
  }, [likedPlaylist]);

  if (loading) return <div className="p-8 text-white">Đang tải tình yêu của bạn...</div>;
  if (!likedPlaylist) return <div className="p-8 text-white">Bạn chưa có danh sách Liked Songs!</div>;

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-8">Liked Songs</h1>
      <p className="mb-4 text-gray-400">{likedSongsData.length} bài hát</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {likedSongsData.map(song => (
          <SongCard key={song.songId} song={{
             id: song.songId,
             title: song.name,
             artist: song.artistName || "Unknown",
             image: song.songImage || "https://placehold.co/400x400/1f2937/fff"
          }} />
        ))}
      </div>
    </div>
  );
};

export default LikedSongsScreen;