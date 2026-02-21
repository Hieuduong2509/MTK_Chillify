import { Link } from "react-router-dom";
import type { Song } from "../../assets/dummyDB";
import { trendingSongs } from "../../assets/dummyDB";
import { useState } from "react";
import { playlists } from "../../assets/dummyDB";

interface Playlist {
  id: string;
  name: string;
  cover: string;
  songs: Song[];
}

const MyPlaylist = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
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
                <div
                  className="
                    absolute right-0 mt-3
                    w-48
                    bg-[#1c2733]
                    border border-white/10
                    rounded-lg
                    shadow-xl
                    py-2
                    z-50
                  "
                >
                  <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-300 hover:bg-white/5 cursor-pointer">
                    <span className="material-symbols-outlined text-sm">
                      play_arrow
                    </span>
                    Play
                  </button>

                  <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-300 hover:bg-white/5 cursor-pointer">
                    <span className="material-symbols-outlined text-sm">
                      edit
                    </span>
                    Edit details
                  </button>

                  <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-400 hover:bg-white/5 cursor-pointer">
                    <span className="material-symbols-outlined text-sm">
                      delete
                    </span>
                    Delete playlist
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPlaylist;
