import { usePlaylist } from "../../context/PlaylistContext";
import SongCard from "../../components/song/SongCard";
import { player } from "../../core/player/Player"; 

const LikedSongs = () => {
  const { playlists, likedSongIds, likedSongsData } = usePlaylist();
  
  const likedPlaylist = playlists.find(p => p.playlistType === 'LIKED' || p.playlistName === 'Liked Songs');

  const displayedSongs = likedSongsData?.filter(song => likedSongIds.includes(song.songId)) || [];

  const formattedPlaylist = displayedSongs.map(song => ({
    id: song.songId,
    title: song.name,
    artist: song.artistName || "Unknown Artist",
    image: song.songImage || "https://placehold.co/400x400/1f2937/fff?text=No+Image",
    audioUrl: song.audioUrl,
    duration: song.duration,
    originalData: song 
  }));

  const handlePlay = (clickedSongId?: string) => {
    if (formattedPlaylist.length === 0) return;
    
    player.loadPlaylist(formattedPlaylist);

    if (clickedSongId) {
        const songToPlay = formattedPlaylist.find(s => s.id === clickedSongId);
        if (songToPlay) player.play(songToPlay);
    } else {
        player.play(formattedPlaylist[0]);
    }
  };

  if (!likedPlaylist) return <div className="p-8 text-white">Loading your love...</div>;

  return (
    <div className="px-8 pt-10 pb-32 text-white bg-linear-to-b from-primary/10 to-transparent min-h-screen">
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-10">
        
        {}
        <div 
          onClick={() => handlePlay()}
          className="w-48 h-48 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center relative group cursor-pointer"
        >
            <span className="material-symbols-outlined text-white text-6xl fill-current group-hover:opacity-0 transition-opacity">favorite</span>
            {}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                <span className="material-symbols-outlined text-white text-7xl drop-shadow-lg">play_circle</span>
            </div>
        </div>
        
        <div className="flex flex-col gap-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Playlist</span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">Liked Songs</h1>
            <p className="mt-2 text-gray-400 font-medium">{displayedSongs.length} songs</p>
            
            {}
            {displayedSongs.length > 0 && (
              <button 
                onClick={() => handlePlay()}
                className="mt-4 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform cursor-pointer mx-auto md:mx-0"
                title="Play All"
              >
                <span className="material-symbols-outlined text-black text-3xl">play_arrow</span>
              </button>
            )}
        </div>
      </div>
      
      {displayedSongs.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
            <span className="material-symbols-outlined text-6xl mb-4 opacity-50">heart_broken</span>
            <p>You don't have any liked songs yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {}
          {formattedPlaylist.map(song => (
            <SongCard 
              key={song.id} 
              song={song} 
              onClick={() => handlePlay(song.id)}
              onPlay={() => handlePlay(song.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedSongs;