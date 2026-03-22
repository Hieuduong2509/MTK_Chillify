import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { trendingSongs } from "../../assets/dummyDB";
import { player } from "../../core/player/Player";

const SongDetail = () => {
  const { id } = useParams<{ id: string }>();

  const song = useMemo(
    () => trendingSongs.find((s) => s.id === Number(id)),
    [id],
  );

  if (!song) {
    return <div className="px-8 py-10 text-white">Song not found</div>;
  }

  const handlePlay = () => {
    player.loadPlaylist(trendingSongs);
    player.play(song);
  };

  return (
    <div className="px-8 pt-10 pb-32 text-white bg-linear-to-b from-primary/5 to-transparent">
      {/* HERO SECTION */}
      <div className="flex flex-col md:flex-row md:items-end gap-10">
        {/* COVER */}
        <div className="relative group">
          <div
            className="w-48 h-48 md:w-64 md:h-64 rounded-xl bg-cover bg-center shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
            style={{ backgroundImage: `url(${song.image})` }}
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

        {/* INFO */}
        <div className="flex flex-1 flex-col justify-end gap-6 pb-2">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Single
            </span>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              {song.title}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-gray-400 text-sm">
              <span className="font-semibold text-white">{song.artist}</span>
              <span>•</span>
              <span>Trending Collection</span>
              <span>•</span>
              <span>2024</span>
              <span>•</span>
              <span>3:45</span>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handlePlay}
              className="flex h-12 min-w-[140px] items-center justify-center gap-2 rounded-full bg-primary px-8 font-bold text-black shadow-lg shadow-primary/20 hover:bg-hover transition-all active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined fill-current">
                play_arrow
              </span>
              Play
            </button>

            {/* Add */}
            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#27313a] border border-[#3a4955] text-white hover:bg-[#3a4955] transition-all duration-300 cursor-pointer">
              <span className="material-symbols-outlined text-2xl">add</span>
            </button>

            {/* Favorite */}
            <button className="flex h-12 w-12 items-center justify-center rounded-full text-gray-400 hover:text-primary transition cursor-pointer">
              <span className="material-symbols-outlined text-2xl">
                favorite
              </span>
            </button>

            {/* More */}
            <button className="flex h-12 w-12 items-center justify-center rounded-full text-gray-400 hover:text-primary transition cursor-pointer">
              <span className="material-symbols-outlined text-2xl">
                more_horiz
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* UP NEXT */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Up Next</h2>

          <button className="text-sm font-bold text-gray-400 hover:text-primary uppercase tracking-wider cursor-pointer">
            Show All
          </button>
        </div>

        <div className="flex flex-col gap-1">
          {trendingSongs
            .filter((s) => s.id !== song.id)
            .slice(0, 3)
            .map((nextSong, index) => (
              <div
                key={nextSong.id}
                onClick={() => {
                  player.loadPlaylist(trendingSongs);
                  player.play(nextSong);
                }}
                className="group flex items-center gap-4 rounded-xl p-3 hover:bg-[#19282E]/50 transition-colors cursor-pointer"
              >
                <div className="flex w-8 justify-center text-gray-400 group-hover:text-white">
                  {index + 1}
                </div>

                <div
                  className="h-12 w-12 rounded bg-cover bg-center"
                  style={{ backgroundImage: `url(${nextSong.image})` }}
                />

                <div className="flex flex-1 flex-col">
                  <p className="text-sm font-bold text-white">
                    {nextSong.title}
                  </p>
                  <p className="text-xs text-gray-400">{nextSong.artist}</p>
                </div>

                <div className="hidden md:block text-sm text-gray-400">
                  Trending Collection
                </div>

                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-gray-400 text-xl opacity-0 group-hover:opacity-100">
                    favorite
                  </span>
                  <span className="text-sm text-gray-400">3:45</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SongDetail;
