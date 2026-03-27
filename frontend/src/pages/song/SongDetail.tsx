import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { player } from "../../core/player/Player";
import AddSongToPlaylistModal from "../../components/playlist/AddSongToPlaylistModal";

import { useSong } from "../../context/SongContext"; 
import { usePlaylist } from "../../context/PlaylistContext"; 

const SongDetail = () => {
  const { id } = useParams<{ id: string }>();

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [selectedSongToModal, setSelectedSongToModal] = useState<any>(null);

  const { songDetail, upNextSongs, loading, fetchSongDetailData } = useSong();
  
  const { likedSongIds, toggleLikeSong } = usePlaylist();

  useEffect(() => {
    if (id) {
      fetchSongDetailData(id);
    }
  }, [id, fetchSongDetailData]);

  if (loading || !songDetail) {
    return <div className="px-8 py-10 text-white">Đang tải bài hát...</div>;
  }

  const handlePlay = () => {
    const playlistToPlay = [songDetail.originalData, ...upNextSongs.map(s => s.originalData)];
    player.loadPlaylist(playlistToPlay);
    player.play(songDetail.originalData);
  };

  const isMainSongLiked = likedSongIds.includes(songDetail.id);

  return (
    <>
      <div className="px-8 pt-10 pb-32 text-white bg-linear-to-b from-primary/5 to-transparent">
        {}
        <div className="flex flex-col md:flex-row md:items-end gap-10">
          {}
          <div className="relative group">
            <img
              className="w-48 h-48 md:w-64 md:h-64 rounded-xl bg-cover bg-center shadow-2xl transition-transform duration-300 group-hover:scale-[1.02] bg-gray-800"
              src={songDetail.image} 
              alt={songDetail.title}
            />

            <div
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/20 rounded-xl cursor-pointer"
            >
              <span className="material-symbols-outlined text-white text-6xl">
                play_circle
              </span>
            </div>
          </div>

          {}
          <div className="flex flex-1 flex-col justify-end gap-6 pb-2">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Single
              </span>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                {songDetail.title} 
              </h1>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-gray-400 text-sm">
                <span className="font-semibold text-white">{songDetail.artist}</span>
                <span>•</span>
                <span>Trending Collection</span>
                <span>•</span>
                <span>2024</span>
                <span>•</span>
                <span>3:45</span>
              </div>
            </div>

            {}
            <div className="flex flex-wrap items-center gap-4">
              <button
                title="Play song"
                onClick={handlePlay}
                className="flex h-12 min-w-[140px] items-center justify-center gap-2 rounded-full bg-primary px-8 font-bold text-black shadow-lg shadow-primary/20 hover:bg-hover transition-all active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined fill-current">play_arrow</span>
                Play
              </button>

              {}
              <button
                onClick={() => {
                  setSelectedSongToModal(songDetail.originalData);
                  setIsOpenAddModal(true);
                }}
                title="Add song to playlist"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#27313a] border border-[#3a4955] text-white hover:bg-[#3a4955] transition-all duration-300 cursor-pointer"
              >
                <span className="material-symbols-outlined text-2xl">add</span>
              </button>

              {}
              <button
                title={isMainSongLiked ? "Unlike this song" : "Like this song"}
                onClick={() => toggleLikeSong(songDetail.id)}
                className={`flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer
                  ${isMainSongLiked ? "text-primary scale-110" : "text-gray-400 hover:text-primary"}`}
              >
                <span className={`material-symbols-outlined text-2xl`}>favorite</span>
              </button>
            </div>
          </div>
        </div>

        {}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Up Next</h2>

            <button className="text-sm font-bold text-gray-400 hover:text-primary uppercase tracking-wider cursor-pointer">
              Show All
            </button>
          </div>

          <div className="flex flex-col gap-1">
            {upNextSongs.map((nextSong, index) => {
              const isNextSongLiked = likedSongIds.includes(nextSong.id);

              return (
                <div
                  key={nextSong.id}
                  className="group flex items-center gap-4 rounded-xl p-3 hover:bg-[#19282E]/50 transition-colors cursor-pointer"
                >
                  <div className="hidden lg:flex w-8 justify-center text-gray-400 group-hover:text-white">
                    {index + 1}
                  </div>

                  <img
                    className="h-12 w-12 rounded bg-cover bg-center bg-gray-800"
                    src={nextSong.image}
                    alt={nextSong.title}
                  />

                  <div
                    onClick={() => {
                      player.loadPlaylist([songDetail.originalData, ...upNextSongs.map(s => s.originalData)]);
                      player.play(nextSong.originalData);
                    }}
                    className="flex flex-1 flex-col"
                  >
                    <p className="text-sm font-bold text-white hover:text-primary transition-all duration-300">
                      {nextSong.title}
                    </p>
                    <p className="text-xs text-gray-400">{nextSong.artist}</p>
                  </div>

                  {}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSongToModal(nextSong.originalData);
                      setIsOpenAddModal(true);
                    }}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#27313a] border border-[#3a4955] text-white hover:bg-[#3a4955] transition-all duration-300 cursor-pointer opacity-0 group-hover:opacity-100"
                  >
                    <span className="material-symbols-outlined text-2xl">add</span>
                  </button>

                  {}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLikeSong(nextSong.id);
                    }}
                    className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 cursor-pointer
                      ${isNextSongLiked ? "text-primary scale-110" : "text-gray-400 hover:text-primary"}`}
                  >
                    <span className="material-symbols-outlined text-2xl">favorite</span>
                  </button>
                </div>
              );
            })}
            
            {upNextSongs.length === 0 && (
               <p className="text-gray-500 text-sm">Chưa có bài hát nào khác trong hệ thống.</p>
            )}
          </div>
        </div>
      </div>

      <AddSongToPlaylistModal
        isOpen={isOpenAddModal}
        song={selectedSongToModal}
        onClose={() => {
          setIsOpenAddModal(false);
          setSelectedSongToModal(null);
        }}
      />
    </>
  );
};

export default SongDetail;