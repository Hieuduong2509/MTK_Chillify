import { useMediaQuery } from "react-responsive";
import { sections } from "../../assets/assets";
import SongCard from "../../components/song/SongCard";
import { useNavigate } from "react-router-dom";
import { useSong } from "../../context/SongContext";
import { useEffect } from "react";

// 🔥 QUAN TRỌNG: Import player vào đây
import { player } from "../../core/player/Player";

const Home = () => {
  const {
    getSongs,
    songsByType,
    getSongsByType,
    loadingByType,
    loadingGlobal,
  } = useSong();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const MAX_SONG_ITEM = isMobile ? 4 : 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getSongs();

        await Promise.all(
          sections.map((section) => getSongsByType(section.id)),
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-4 md:px-7 py-4 md:py-6 space-y-8 pb-24">
      {sections.map((section) => {
        // Lấy toàn bộ bài hát của danh mục này
        const songs = songsByType[section.id] || [];
        const previewSongs = songs.slice(0, MAX_SONG_ITEM);

        // 🔥 HÀM XỬ LÝ KHI BẤM PLAY Ở TRANG HOME
        const handlePlaySectionSong = (clickedSong: any) => {
          // 1. Nạp TẤT CẢ bài hát của danh mục này vào Player (Không chỉ nạp preview)
          player.loadPlaylist(songs);
          // 2. Bật chế độ Random (Shuffle)
          player.setShuffleMode(true);
          // 3. Phát bài hát vừa click
          player.play(clickedSong);
        };

        return (
          <section key={`home-section-${section.id}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-white">
                  {section.title}
                </h2>
                {loadingByType[section.id] && (
                  <div className="w-5 h-5 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
                )}
              </div>

              <button
                className="text-primary text-sm font-semibold hover:underline cursor-pointer"
                onClick={() => navigate(`/section/${section.id}`)}
              >
                Show all
              </button>
            </div>

            {(loadingGlobal || loadingByType[section.id]) &&
            songs.length === 0 ? (
              <div className="flex items-center gap-2">
                <p className="text-white">Loading...</p>
                <div className="w-5 h-5 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {previewSongs.map((song) => (
                  <SongCard 
                    key={`song-${song.id}`} 
                    song={song} 
                    // 🔥 TRUYỀN HÀM XỬ LÝ XUỐNG CHO SONG CARD
                    onPlay={() => handlePlaySectionSong(song)} 
                  />
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};

export default Home;