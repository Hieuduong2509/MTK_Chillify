import { Link } from "react-router-dom";
import type { Song } from "../../assets/dummyDB";
import { useState } from "react";
import { playlists } from "../../assets/dummyDB";
import PlaylistModal from "../../components/playlist/PlaylistModal";
import DropdownMenu from "../../components/common/DropdownMenu";

interface Playlist {
  id: string;
  name: string;
  cover: string;
  songs: Song[];
}

const MyPlaylist = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedPlaylist, setSelectedPlaylist] = useState<any>(null);

  return (
    <>
      <div className="px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-1.5">
          <h1 className="text-3xl font-bold text-white">My Playlist</h1>

          <button
            className="
            flex items-center gap-2
            px-5 py-2
            bg-primary
            hover:bg-hover
            rounded-lg
            text-white
            font-medium
            transition-all duration-300
            cursor-pointer
          "
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

        {/* List */}
        <div className="divide-y divide-white/5">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="
              relative
              flex items-center justify-between
              py-4
              hover:bg-white/5
              px-2
              rounded-lg
              transition-all duration-300
            "
            >
              {/* Left Info */}
              <Link
                to={`/playlists/${playlist.id}`}
                className="flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-lg overflow-hidden">
                  <img
                    src={playlist.cover}
                    alt={playlist.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-white hover:text-primary transition-all duration-300">
                    {playlist.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {playlist.songs.length} songs
                  </p>
                </div>
              </Link>

              {/* Menu */}
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
                    items={[
                      {
                        label: "Play",
                        icon: "play_arrow",
                        onClick: () => alert("Play"),
                      },
                      {
                        label: "Edit details",
                        icon: "edit",
                        onClick: () => {
                          setMode("edit");
                          setSelectedPlaylist(playlist);
                          setIsOpenModal(true);
                        },
                      },
                      {
                        label: "Delete playlist",
                        icon: "delete",
                        variant: "danger",
                        onClick: () => alert("Deleted"),
                      },
                    ]}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <AddPlaylistModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      /> */}

      <PlaylistModal
        isOpen={isOpenModal}
        mode={mode}
        initialData={selectedPlaylist}
        onClose={() => setIsOpenModal(false)}
        onSubmit={(data) => {
          if (mode === "create") {
            console.log("CREATE", data);
          } else {
            console.log("UPDATE", data);
          }
        }}
      />
    </>
  );
};

export default MyPlaylist;
