import { Link } from "react-router-dom";
import { useState } from "react";
import { usePlaylist } from "../../context/PlaylistContext"; 
import PlaylistModal from "../../components/playlist/PlaylistModal";
import DropdownMenu from "../../components/common/DropdownMenu";
import ConfirmDeleteModal from "../../components/common/ConfirmDeleteModal";

const MyPlaylist = () => {
  const { playlists, deletePlaylist, createPlaylist, updatePlaylist } = usePlaylist();

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedPlaylist, setSelectedPlaylist] = useState<any>(null);
  
  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean;
    type: "delete-playlist" | "remove-song" | null;
    playlistId: string | null; 
  }>({
    isOpen: false,
    type: null,
    playlistId: null
  });

  const handleConfirmAction = async () => {
    if (confirmState.type === "delete-playlist" && confirmState.playlistId) {
      await deletePlaylist(confirmState.playlistId);
    }
    setConfirmState({ isOpen: false, type: null, playlistId: null });
  };

  return (
    <>
      <div className="px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-1.5">
          <h1 className="text-3xl font-bold text-white">My Playlist</h1>

          <button
            className="flex items-center gap-2 px-5 py-2 bg-primary hover:bg-hover rounded-lg text-white font-medium transition-all duration-300 cursor-pointer"
            onClick={() => {
              setMode("create");
              setSelectedPlaylist(null);
              setIsOpenModal(true);
            }}
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Add new playlist
          </button>
        </div>

        {/* Playlist List */}
        <div className="divide-y divide-white/5">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="relative flex items-center justify-between py-4 hover:bg-white/5 px-2 rounded-lg transition-all duration-300"
            >
              <Link
                to={`/playlists/${playlist.id}`}
                className="flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-neutral-800 flex items-center justify-center">
                  <span className="material-symbols-outlined text-gray-500">music_note</span>
                </div>

                <div>
                  <h3 className="font-semibold text-white hover:text-primary transition-all duration-300">
                    {playlist.playlistName}
                  </h3>
                  
                  {}
                  <p className="text-sm text-gray-400">
                    {playlist.songCount || 0} songs
                  </p>
                  
                </div>
              </Link>

              {/* Menu Actions */}
              <div className="relative">
                <span
                  onClick={() =>
                    setOpenMenu(openMenu === playlist.id ? null : playlist.id)
                  }
                  className="material-symbols-outlined text-gray-400 cursor-pointer hover:text-white transition"
                >
                  more_vert
                </span>

                {openMenu === playlist.id && (
                  <DropdownMenu
                    className="right-0 top-full"
                    items={[
                      {
                        label: "Edit details",
                        icon: "edit",
                        onClick: () => {
                          setMode("edit");
                          setSelectedPlaylist(playlist);
                          setIsOpenModal(true);
                          setOpenMenu(null);
                        },
                      },
                      {
                        label: "Delete playlist",
                        icon: "delete",
                        variant: "danger",
                        onClick: () => {
                          setConfirmState({
                            isOpen: true,
                            type: "delete-playlist",
                            playlistId: playlist.id
                          });
                          setOpenMenu(null);
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

      <PlaylistModal
        isOpen={isOpenModal}
        mode={mode}
        initialData={selectedPlaylist ? {
          id: selectedPlaylist.id,
          name: selectedPlaylist.playlistName,
          description: selectedPlaylist.description || ""
        } : { name: "", description: "" }} 
        onClose={() => setIsOpenModal(false)}
        onSubmit={async (data) => {
          if (mode === "create") {
            await createPlaylist(data.name, data.description);
          } else {
            await updatePlaylist(selectedPlaylist.id, data.name, data.description);
          }
          setIsOpenModal(false);
        }}
      />

      <ConfirmDeleteModal
        isOpen={confirmState.isOpen}
        title={confirmState.type === "delete-playlist" ? "Delete Playlist" : "Remove Song"}
        description={confirmState.type === "delete-playlist" ? "Do you want to delete this playlist?" : "Remove this song from playlist?"}
        confirmText={confirmState.type === "delete-playlist" ? "Delete" : "Remove"}
        onClose={() => setConfirmState({ isOpen: false, type: null, playlistId: null })}
        onConfirm={handleConfirmAction} 
      />
    </>
  );
};

export default MyPlaylist;