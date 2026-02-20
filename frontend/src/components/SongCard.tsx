import { Link } from "react-router-dom";
import type { Song } from "../assets/dummyDB";

interface SongCardProps {
  song: Song;
}

export default function SongCard({ song }: SongCardProps) {
  return (
    <Link
      to={`/song/${song.id}`}
      className="group space-y-3 cursor-pointer block"
    >

      <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-lg bg-slate-200 dark:bg-border-dark">
        <img
          src={song.image}
          alt={song.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 bg-primary hover:bg-hover rounded-full flex items-center justify-center shadow-xl text-white transform scale-90 group-hover:scale-100 transition-all duration-300">
            <span className="material-symbols-outlined fill-1 text-3xl">
              play_arrow
            </span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-slate-900 dark:text-white truncate">
          {song.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
          {song.artist}
        </p>
      </div>
    </Link>

  );
}
