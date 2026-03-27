import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SongCard from "../../components/song/SongCard";
import { useSong } from "../../context/SongContext"; // Import hook

const SectionDetail = () => {
  const { sectionId } = useParams();
  
  const { sectionDetail, loading, fetchSectionDetail } = useSong();

  useEffect(() => {
    if (sectionId) {
      fetchSectionDetail(sectionId);
    }
  }, [sectionId, fetchSectionDetail]);

  if (loading) return <div className="p-10 text-white">Đang tải danh sách...</div>;
  if (!sectionDetail || sectionDetail.songs.length === 0) 
    return <div className="p-10 text-white">Section không có bài hát nào!</div>;

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="max-w-350 px-4 py-4 lg:p-10">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-1.5">
          <div>
            <h1 className="text-lg lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
              {sectionDetail.title}
            </h1>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2 font-bold text-sm shadow-lg shadow-primary/20 hover:bg-hover transition-all duration-300 cursor-pointer">
              <span className="material-symbols-outlined text-lg">play_arrow</span>
              Play All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8">
          {sectionDetail.songs.map((song: any) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionDetail;