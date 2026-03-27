import { useNavigate } from "react-router-dom";
import { player } from "../../core/player/Player";
// Nhớ import usePlaylist từ Context
import { usePlaylist } from "../../context/PlaylistContext";

import { Link } from "react-router-dom";
import type { Song } from "../../assets/dummyDB";

const SongCard = ({ song }: { song: any }) => {
  const navigate = useNavigate();

  const { likedSongIds, toggleLikeSong } = usePlaylist();

  const isLiked = likedSongIds.includes(song.id);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    player.play(song.originalData || song);
  };

  const handleCardClick = () => {
    navigate(`/song/${song.id}`);
  };

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!localStorage.getItem("token")) {
      alert("Vui lòng đăng nhập để thực hiện chức năng này!");
      return;
    }

    await toggleLikeSong(song.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col gap-3 p-3 lg:p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
    >
      <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-lg bg-slate-200 dark:bg-border-dark">
        <img
          src={song.image}
          alt={song.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 bg-gray-800"
        />

        {/* Nút Play hiển thị khi hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
          <button
            onClick={handlePlay}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-black shadow-xl hover:scale-105 hover:bg-hover transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined fill-current text-2xl">
              play_arrow
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-bold text-white truncate group-hover:text-primary transition-colors">
          {song.title}
        </h3>
        <p className="text-sm text-gray-400 truncate">{song.artist}</p>
      </div>

      <button
        onClick={handleLikeClick}
        title={isLiked ? "Unlike" : "Like"}
        className={`absolute flex items-center justify-center top-5 right-5 z-10 p-2 rounded-full backdrop-blur-sm transition-all duration-300 cursor-pointer
          ${
            isLiked
              ? "bg-primary text-black opacity-100 scale-110"
              : "bg-black/40 text-white opacity-0 group-hover:opacity-100 hover:text-primary"
          }`}
      >
        <span
          className={`material-symbols-outlined text-xl ${isLiked ? "fill-current" : ""}`}
        >
          favorite
        </span>
      </button>
    </div>
  );
};

export default SongCard;
