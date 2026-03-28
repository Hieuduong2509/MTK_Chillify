import { usePlaylist } from "../../context/PlaylistContext";
import SongCard from "../../components/song/SongCard";

const LikedSongs = () => {
  // Rút cả data và mảng ID từ Context, KHÔNG dùng apiRequest ở đây nữa
  const { playlists, likedSongIds, likedSongsData } = usePlaylist();
  
  const likedPlaylist = playlists.find(p => p.playlistType === 'LIKED' || p.playlistName === 'Liked Songs');

  // Lọc real-time: Mảng hiển thị sẽ luôn update khi likedSongIds thay đổi
  // likedSongsData: mảng chứa data gốc lấy từ Context
  // likedSongIds: mảng chứa ID, được Context cập nhật tự động khi bấm nút Trái tim
  const displayedSongs = likedSongsData?.filter(song => likedSongIds.includes(song.songId)) || [];

  if (!likedPlaylist) return <div className="p-8 text-white">Loading your love...</div>;

  return (
    <div className="px-8 pt-10 pb-32 text-white bg-linear-to-b from-primary/10 to-transparent min-h-screen">
      <div className="flex items-end gap-6 mb-10">
        <div className="w-48 h-48 rounded-xl shadow-2xl bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-6xl fill-current">favorite</span>
        </div>
        <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Playlist</span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">Liked Songs</h1>
            <p className="mt-2 text-gray-400 font-medium">{displayedSongs.length} songs</p>
        </div>
      </div>
      
      {displayedSongs.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
            <span className="material-symbols-outlined text-6xl mb-4 opacity-50">heart_broken</span>
            <p>You don't have any liked songs yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {displayedSongs.map(song => (
            <SongCard 
              key={song.songId} 
              song={{
                id: song.songId,
                title: song.name,
                artist: song.artistName || "Unknown Artist",
                image: song.songImage || "https://placehold.co/400x400/1f2937/fff?text=No+Image",
                audioUrl: song.audioUrl,
                duration: song.duration,
                originalData: song 
              }} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedSongs;