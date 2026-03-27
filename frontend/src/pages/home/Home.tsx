import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import SongCard from "../../components/song/SongCard";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../api/api"; // Chỉnh lại đường dẫn nếu cần

const Home = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const MAX_SONG_ITEM = isMobile ? 4 : 6;

  // State chứa các section lấy từ DB
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // Lấy tất cả bài hát từ Database
        const allSongs = await apiRequest<any[]>('song', '/songs');
        
        // "Ép kiểu" dữ liệu DB cho giống với format cũ của SongCard
        const formattedSongs = allSongs.map(s => ({
          ...s,
          id: s.songId, // Chuyển songId thành id
          title: s.name, // Chuyển name thành title
          artist: s.artistName || 'Unknown Artist',
          image: s.songImage || 'https://placehold.co/400x400/1f2937/fff?text=No+Image'
        }));

        // Tự động chia bài hát ra làm 2 Section để UI trông đẹp mắt
        const homeSections = [
          {
            id: 'trending',
            title: 'Trending Now',
            songs: formattedSongs.slice(0, 6) // Lấy 6 bài đầu
          },
          {
            id: 'for-you',
            title: 'For You',
            songs: formattedSongs.slice(6, 12) // Lấy 6 bài tiếp theo
          }
        ];

        setSections(homeSections);
      } catch (error) {
        console.error("Lỗi tải trang chủ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) return <div className="p-8 text-white">Đang tải trang chủ...</div>;

  return (
    <div className="px-4 md:px-7 py-4 md:py-6 space-y-8 pb-24">
      {sections.map((section) => {
        const previewSongs = section.songs.slice(0, MAX_SONG_ITEM);

        return (
          <section key={`home-section-${section.id}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {section.title}
              </h2>
              <button
                className="text-primary text-sm font-semibold hover:underline cursor-pointer"
                onClick={() => navigate(`/section/${section.id}`)}
              >
                Show all
              </button>
            </div>

            <div
              className="grid
              grid-cols-1
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-6
              gap-4
              pb-4"
            >
              {previewSongs.length > 0 ? (
                previewSongs.map((song: any) => (
                  <SongCard key={`song-${song.id}`} song={song} />
                ))
              ) : (
                <p className="text-gray-400">Chưa có bài hát nào.</p>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Home;