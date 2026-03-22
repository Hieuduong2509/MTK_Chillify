import React from "react";
import { useParams } from "react-router-dom";
import { homeSections } from "../../assets/assets";
import SongCard from "../../components/SongCard";

const SectionDetail = () => {
  const { sectionId } = useParams();
  const section = homeSections.find((s) => s.id.toString() === sectionId);

  if (!section) {
    return <div className="text-lg">Section not found!</div>;
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="max-w-350 px-4 py-4 lg:p-10">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-1.5">
          <div>
            <h1 className="text-lg lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {section.title}
            </h1>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2 font-bold text-sm shadow-lg shadow-primary/20 hover:bg-hover transition-all duration-300 cursor-pointer">
              <span className="material-symbols-outlined text-lg">
                play_arrow
              </span>
              Play All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8">
          {/* Song card */}
          {section.songs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>

        {/* Load more results */}
        <div className="flex justify-center mt-12 mb-20">
          <button className="px-8 py-3 bg-slate-200 dark:bg-surface-dark text-slate-900 dark:text-white font-bold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-800 transition-colors cursor-pointer">
            Load More Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionDetail;
