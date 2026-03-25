import React, { useState } from "react";
import AddSongToPlaylistModal from "../../components/playlist/AddSongToPlaylistModal";
import ConfirmDeleteModal from "../../components/common/ConfirmDeleteModal";
import DropdownMenu from "../../components/common/DropdownMenu";
import { likedSongs, playlists } from "../../assets/dummyDB";
import { player } from "../../core/player/Player";
import { assets } from "../../assets/assets";

const LikedSongs = () => {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState<any>(null);
  const [openSongMenu, setOpenSongMenu] = useState<number | null>(null);
  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean;
    type: "delete-playlist" | "remove-song" | null;
    songId?: number;
  }>({
    isOpen: false,
    type: null,
  });

  const handlePlayAll = () => {
    if (likedSongs.length === 0) return;
    player.loadPlaylist(likedSongs);
    player.play(likedSongs[0]);
  };

  const handlePlaySong = (song: any) => {
    player.loadPlaylist(likedSongs);
    player.play(song);
  };

  return (
    <>
      <div className="px-8 pt-6 pb-24 text-white">
        {/* HEADER */}
        <section className="flex flex-col md:flex-row gap-8 items-start md:items-end">
          {/* Cover */}
          <div className="shrink-0">
            <img
              className="w-48 h-48 md:w-64 md:h-64 rounded-xl shadow-2xl bg-cover bg-center"
              src={assets.like_songs_img}
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              Playlist
            </span>

            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight">
              Liked Songs
            </h1>

            <p className="text-gray-400 max-w-2xl">
              Your favorite tracks, all in one place.
            </p>

            <div className="flex items-center gap-2 text-sm text-white/90 mt-2">
              <span className="font-bold">MusicStream</span>
              <span className="text-gray-500">•</span>
              <span>{likedSongs.length} songs</span>
            </div>
          </div>
        </section>

        {/* ACTION */}
        <section className="flex items-center gap-6 mt-8 mb-6">
          <button
            onClick={handlePlayAll}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-primary text-black hover:scale-105 transition shadow-lg cursor-pointer"
          >
            <span className="material-symbols-outlined text-4xl fill-icon">
              play_arrow
            </span>
          </button>
        </section>

        {/* TABLE HEADER */}
        <div className="grid grid-cols-[auto_1fr_auto] lg:grid-cols-[auto_1fr_1fr_1fr_auto] gap-4 px-4 py-3 border-b border-white/10 text-gray-400 text-xs font-bold uppercase">
          <div className="w-8 text-center">#</div>
          <div>Title</div>
          <div className="hidden lg:block">Date Added</div>
          <div className="hidden lg:block w-16 text-right">
            <span className="material-symbols-outlined text-sm">schedule</span>
          </div>
          <div className="w-10">Actions</div>
        </div>

        {/* SONG LIST */}
        <div className="mt-2 flex flex-col">
          {likedSongs.map((song, index) => (
            <div
              key={song.id}
              className="grid grid-cols-[auto_1fr_auto] lg:grid-cols-[auto_1fr_1fr_1fr_auto] gap-4 px-4 py-3 items-center hover:bg-white/5 group"
            >
              <div className="w-8 text-center text-gray-500 text-sm group-hover:hidden">
                {index + 1}
              </div>

              <div className="w-8 text-center text-primary hidden group-hover:block">
                <span className="material-symbols-outlined text-base fill-icon">
                  play_arrow
                </span>
              </div>

              {/* TITLE */}
              <div
                onClick={() => handlePlaySong(song)}
                className="flex items-center gap-4 cursor-pointer"
              >
                <img
                  className="w-10 h-10 rounded bg-cover bg-center"
                  src={song.image}
                  alt=""
                />

                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold truncate group-hover:text-primary">
                    {song.title}
                  </span>
                  <span className="text-gray-400 text-xs truncate">
                    {song.artist}
                  </span>
                </div>
              </div>

              <div className="hidden lg:block text-gray-400 text-sm">—</div>

              <div className="hidden lg:block w-16 text-right text-gray-400 text-sm">
                3:45
              </div>

              {/* ACTION */}
              <div className="relative flex justify-end">
                <button
                  onClick={() =>
                    setOpenSongMenu(openSongMenu === song.id ? null : song.id)
                  }
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xl">
                    more_horiz
                  </span>
                </button>

                {openSongMenu === song.id && (
                  <DropdownMenu
                    className="right-0 top-full mt-2"
                    items={[
                      {
                        label: "Add to playlist",
                        icon: "playlist_add",
                        onClick: () => {
                          setSelectedSong(song);
                          setIsOpenAddModal(true);
                          setOpenSongMenu(null);
                        },
                      },
                      {
                        label: "Remove from Liked Songs",
                        icon: "delete",
                        variant: "danger",
                        onClick: () => {
                          setConfirmState({
                            isOpen: true,
                            type: "remove-song",
                            songId: song.id,
                          });
                        },
                      },
                    ]}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={confirmState.isOpen}
        title="Remove Song"
        description="Remove this song from Liked Songs?"
        confirmText="Remove"
        onClose={() => setConfirmState({ isOpen: false, type: null })}
      />

      <AddSongToPlaylistModal
        isOpen={isOpenAddModal}
        song={selectedSong}
        onClose={() => {
          setIsOpenAddModal(false);
          setSelectedSong(null);
        }}
      />
    </>
  );
};

export default LikedSongs;
