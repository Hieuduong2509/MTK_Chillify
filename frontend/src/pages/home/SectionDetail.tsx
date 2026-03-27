import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SongCard from "../../components/song/SongCard";
import { apiRequest } from "../../api/api"; 

const SectionDetail = () => {
  const { sectionId } = useParams();
  const [section, setSection] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSectionDetail = async () => {
      setLoading(true);
      try {
        
        const data = await apiRequest<any[]>('song', `/song-section?type=${sectionId}`);
        
        const formattedSongs = data.map(s => ({
          ...s,
          id: s.songId,
          title: s.name,
          artist: s.artistName || 'Unknown Artist',
          image: s.songImage || 'https://placehold.co/400x400/1f2937/fff?text=No+Image'
        }));

        setSection({
          id: sectionId,

          title: sectionId === 'trending' ? 'Trending Now' : 'For You', 
          songs: formattedSongs
        });
      } catch (error) {
        console.error("Lỗi lấy chi tiết danh sách:", error);
      } finally {
        setLoading(false);
      }
    };

    if (sectionId) {
      fetchSectionDetail();
    }
  }, [sectionId]);

  if (loading) return <div className="p-10 text-white">Đang tải danh sách...</div>;
  if (!section || section.songs.length === 0) return <div className="p-10 text-white">Section không có bài hát nào!</div>;

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="max-w-350 px-4 py-4 lg:p-10">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-1.5">
          <div>
            <h1 className="text-lg lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
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
          {/* Render Song card*/}
          {section.songs.map((song: any) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>

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