import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SongCard from "../../components/song/SongCard";
import { useSong } from "../../context/SongContext";
import { player } from "../../core/player/Player";

const SectionDetail = () => {
  const { songsByType, getSongsByType, loadingByType } = useSong();
  const { sectionId } = useParams<{ sectionId: string }>();

  useEffect(() => {
    if (sectionId && !songsByType[sectionId]) {
      getSongsByType(sectionId);
    }
  }, [sectionId]);

  const songs = songsByType[sectionId || ""] || [];

  const sectionTitleMap: Record<string, string> = {
    trending: "Trending",
    new: "New Releases",
    discover: "Discover",
  };

  const title = sectionTitleMap[sectionId || ""] || "Section";

  if (sectionId && loadingByType[sectionId] && songs.length === 0) {
    return <div className="text-white p-10">Loading...</div>;
  }

  if (!sectionId) {
    return <div className="text-white p-10">Section not found!</div>;
  }

  const handlePlayAll = () => {
    player.loadPlaylist(songs);
    player.play(songs[0]);
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="px-4 py-4 lg:p-10">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-1.5">
          <div className="flex items-center gap-3">
            <h1 className="text-lg lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {title}
            </h1>

            {sectionId && loadingByType[sectionId] && (
              <div className="w-5 h-5 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePlayAll}
              className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2 font-bold text-sm shadow-lg shadow-primary/20 hover:bg-hover transition-all duration-300 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">
                play_arrow
              </span>
              Play All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8">
          {/* Song card */}
          {songs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionDetail;
