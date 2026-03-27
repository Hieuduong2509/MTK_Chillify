import { usePlaylist } from "../../context/PlaylistContext";

const AddSongToPlaylistModal = ({ isOpen, song, onClose }: any) => {
  const { playlists, addSongToPlaylist } = usePlaylist();

  if (!isOpen || !song) return null;

  const handleSelect = async (playlistId: string) => {
    await addSongToPlaylist(playlistId, song.songId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#181818] w-full max-w-sm rounded-xl border border-white/10 shadow-2xl overflow-hidden">
        <div className="p-5 border-b border-white/5 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">Add to playlist</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="max-h-[350px] overflow-y-auto p-2">
          {playlists.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No playlists found</p>
          ) : (
            playlists.map((p) => (
              <div 
                key={p.id}
                onClick={() => handleSelect(p.id)}
                className="flex items-center gap-4 p-3 hover:bg-white/10 rounded-lg cursor-pointer transition-all"
              >
                <div className="w-10 h-10 bg-neutral-800 rounded flex items-center justify-center text-xl">🎵</div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{p.playlistName}</p>
                  
                  {}
                  <p className="text-xs text-gray-500">{p.songCount || 0} songs</p>
                  
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AddSongToPlaylistModal;