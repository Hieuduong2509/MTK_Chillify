import { useParams, useNavigate } from "react-router-dom"; // ĐÃ GỘP IMPORT CHUẨN
import { player } from "../../core/player/Player";
import { useEffect, useState } from "react";
import { usePlaylist } from "../../context/PlaylistContext";
import DropdownMenu from "../../components/common/DropdownMenu";
import ConfirmDeleteModal from "../../components/common/ConfirmDeleteModal";
import PlaylistModal from "../../components/playlist/PlaylistModal";
import AddSongToPlaylistModal from "../../components/playlist/AddSongToPlaylistModal";

const PlaylistDetail = () => {
  const navigate = useNavigate(); // CHỈ GIỮ LẠI 1 CÁI NÀY THÔI
  
  const { id } = useParams<{ id: string }>();
  const { currentPlaylist, fetchPlaylistDetail, deletePlaylist, updatePlaylist, removeSongFromPlaylist, loading } = usePlaylist();

  const [openMenu, setOpenMenu] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [openSongMenu, setOpenSongMenu] = useState<string | null>(null);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState<any>(null);
  
  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean;
    type: "delete-playlist" | "remove-song" | null;
    songId?: string;
  }>({
    isOpen: false,
    type: null,
  });

  useEffect(() => {
    if (id) {
      fetchPlaylistDetail(id);
    }
  }, [id]);

  const mapToPlayerSong = (s: any) => ({
    id: s.songId,
    title: s.name,
    artist: s.artistName || "Unknown Artist", 
    image: s.songImage || "",
    audio: s.audioUrl || "",
    duration: s.duration || "0:00",
    originalData: s 
  });

  const handlePlayAll = () => {
    if (!currentPlaylist?.songs || currentPlaylist.songs.length === 0) return;
    const playerSongs = currentPlaylist.songs.map(mapToPlayerSong);
    player.loadPlaylist(playerSongs);
    player.play(playerSongs[0]);
  };

  const handlePlaySong = (song: any) => {
    if (!currentPlaylist?.songs) return;
    const playerSongs = currentPlaylist.songs.map(mapToPlayerSong);
    const targetSong = mapToPlayerSong(song);
    player.loadPlaylist(playerSongs);
    player.play(targetSong);
  };

  const onConfirmAction = async () => {
    if (confirmState.type === "delete-playlist" && id) {
      await deletePlaylist(id);
      navigate("/playlists"); 
    } else if (confirmState.type === "remove-song" && id && confirmState.songId) {
      await removeSongFromPlaylist(id, confirmState.songId);
    }
    setConfirmState({ isOpen: false, type: null });
  };


  if (loading) return <div className="px-8 py-10 text-white">Loading playlist...</div>;
  if (!currentPlaylist) return <div className="px-8 py-10 text-white">Playlist not found</div>;

  return (
    <>
      <div className="px-8 pt-6 pb-24 text-white">
        {/* HEADER */}
        <section className="flex flex-col md:flex-row gap-8 items-start md:items-end">
          <div className="shrink-0">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-xl shadow-2xl bg-neutral-800 flex items-center justify-center text-6xl">
               <span className="material-symbols-outlined text-gray-500 text-6xl">music_note</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              {currentPlaylist.playlistType === "LIKED" ? "System Playlist" : "Playlist"}
            </span>
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight">{currentPlaylist.playlistName}</h1>
            {currentPlaylist.description && <p className="text-gray-400 max-w-2xl">{currentPlaylist.description}</p>}
            <div className="flex items-center gap-2 text-sm text-white/90 mt-2">
              <span className="font-bold">Chillify</span>
              <span className="text-gray-500">•</span>
              <span>{currentPlaylist.songs?.length || 0} songs</span>
            </div>
          </div>
        </section>

        {}
        <section className="flex items-center gap-6 mt-8 mb-6">
          <button onClick={handlePlayAll} className="w-14 h-14 flex items-center justify-center rounded-full bg-primary text-black hover:scale-105 transition shadow-lg shadow-primary/30 cursor-pointer">
            <span className="material-symbols-outlined text-4xl fill-icon">play_arrow</span>
          </button>

          {}
          {currentPlaylist.playlistType !== "LIKED" && (
            <div className="relative">
              <button onClick={() => setOpenMenu(!openMenu)} className="text-gray-400 hover:text-primary transition cursor-pointer">
                <span className="material-symbols-outlined text-3xl">more_horiz</span>
              </button>

              {openMenu && (
                <DropdownMenu
                  className="left-5 top-full z-50"
                  items={[
                    {
                      label: "Edit details",
                      icon: "edit",
                      onClick: () => { setMode("edit"); setIsOpenModal(true); setOpenMenu(false); },
                    },
                    {
                      label: "Delete playlist",
                      icon: "delete",
                      variant: "danger",
                      onClick: () => { setConfirmState({ isOpen: true, type: "delete-playlist" }); setOpenMenu(false); },
                    },
                  ]}
                />
              )}
            </div>
          )}
        </section>

        {}
        <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_1fr_auto] lg:grid-cols-[auto_1fr_1fr_1fr_auto] gap-4 px-4 py-3 border-b border-white/10 text-gray-400 text-xs font-bold uppercase tracking-wider">
          <div className="w-8 text-center">#</div>
          <div>Title</div>
          <div className="hidden lg:block">Status</div>
          <div className="hidden lg:block w-16 text-right">
            <span className="material-symbols-outlined text-sm">schedule</span>
          </div>
          <div className="w-10">Actions</div>
        </div>

        {}
        <div className="mt-2 flex flex-col">
          {currentPlaylist.songs?.map((song, index) => (
            <div key={song.songId} className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_1fr_auto] lg:grid-cols-[auto_1fr_1fr_1fr_auto] gap-4 px-4 py-3 items-center rounded-lg hover:bg-white/5 group transition cursor-pointer">
              
              {}
              <div className="w-8 text-center relative flex items-center justify-center">
                <span className="text-gray-500 text-sm group-hover:hidden">{index + 1}</span>
                <span 
                  onClick={() => handlePlaySong(song)} 
                  className="material-symbols-outlined text-base fill-icon text-primary hidden group-hover:block"
                >
                  play_arrow
                </span>
              </div>

              {}
              <div className="flex items-center gap-4 min-w-0" onClick={() => handlePlaySong(song)}>
                <img className="w-10 h-10 rounded bg-cover bg-center shrink-0 bg-neutral-800" src={song.songImage || "https://placehold.co/100x100/1f2937/fff?text=No+Image"} alt="" />
                <div className="flex flex-col min-w-0">
                  <span className="text-white text-sm font-semibold truncate group-hover:text-primary transition-all">{song.name}</span>
                  <span className="text-gray-400 text-xs truncate">{song.artistName || "Unknown Artist"}</span>
                </div>
              </div>

              {}
              <div className="hidden lg:block text-gray-400 text-sm truncate">Added</div>
              
              {}
              <div className="hidden lg:block w-16 text-right text-gray-400 text-sm">{song.duration || "--:--"}</div>

              {}
              <div className="relative flex justify-end">
                <button onClick={(e) => {
                    e.stopPropagation();
                    setOpenSongMenu(openSongMenu === song.songId ? null : song.songId)
                  }} 
                  className="transition text-gray-400 hover:text-white cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xl">more_horiz</span>
                </button>

                {openSongMenu === song.songId && (
                  <DropdownMenu
                    className="right-0 top-full mt-2 z-50"
                    items={[
                      {
                        label: "Add to other playlist",
                        icon: "playlist_add",
                        onClick: () => { setSelectedSong(song); setIsOpenAddModal(true); setOpenSongMenu(null); },
                      },
                      {
                        label: "Remove from this playlist",
                        icon: "delete",
                        variant: "danger",
                        onClick: () => { setConfirmState({ isOpen: true, type: "remove-song", songId: song.songId }); setOpenSongMenu(null); },
                      },
                    ]}
                  />
                )}
              </div>
            </div>
          ))}

          {(!currentPlaylist.songs || currentPlaylist.songs.length === 0) && (
            <div className="text-center text-gray-500 py-10">
              Không có bài hát nào trong playlist này.
            </div>
          )}
        </div>
      </div>

      <PlaylistModal
        isOpen={isOpenModal}
        mode={mode}
        initialData={{ id: currentPlaylist.id, name: currentPlaylist.playlistName, description: currentPlaylist.description || "" }}
        onClose={() => setIsOpenModal(false)}
        onSubmit={async (data) => {
          await updatePlaylist(currentPlaylist.id, data.name, data.description);
          setIsOpenModal(false);
        }}
      />

      <ConfirmDeleteModal
        isOpen={confirmState.isOpen}
        title={confirmState.type === "delete-playlist" ? "Delete Playlist" : "Remove Song"}
        description={confirmState.type === "delete-playlist" ? "Do you want to delete this playlist?" : "Remove this song from playlist?"}
        confirmText={confirmState.type === "delete-playlist" ? "Delete" : "Remove"}
        onClose={() => setConfirmState({ isOpen: false, type: null })}
        onConfirm={onConfirmAction}
      />

      <AddSongToPlaylistModal
        isOpen={isOpenAddModal}
        song={selectedSong}
        onClose={() => { setIsOpenAddModal(false); setSelectedSong(null); }}
      />
    </>
  );
};

export default PlaylistDetail;