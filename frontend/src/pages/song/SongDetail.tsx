import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// 1. XÓA DÒNG IMPORT DUMMY DATA:
// import { trendingSongs } from "../../assets/dummyDB";
import { player } from "../../core/player/Player";
import DropdownMenu from "../../components/common/DropdownMenu";
import AddSongToPlaylistModal from "../../components/playlist/AddSongToPlaylistModal";

// 2. IMPORT HÀM GỌI API (Đảm bảo đường dẫn này đúng với file api.ts của bạn)
import { apiRequest } from "../../api/api"; 

const SongDetail = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState<any>(null);
  
  // Đổi thành Record<string, boolean> vì UUID là chuỗi
  const [likedSongs, setLikedSongs] = useState<Record<string, boolean>>({}); 

  // 3. STATE LƯU DỮ LIỆU THẬT
  const [song, setSong] = useState<any>(null);
  const [upNextSongs, setUpNextSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams<{ id: string }>();

  // 4. FETCH DỮ LIỆU TỪ BACKEND
  useEffect(() => {
    const fetchSongData = async () => {
      setLoading(true);
      try {
        // Lấy chi tiết bài hát chính
        const songDetail = await apiRequest("song", `/${id}`);
        setSong(songDetail);

        // Lấy danh sách bài hát cho phần "Up Next" (Tạm lấy tất cả rồi lọc bài hiện tại)
        const allSongs = await apiRequest<any[]>("song", "/songs");
        const nextSongs = allSongs.filter(s => s.songId !== id).slice(0, 3);
        setUpNextSongs(nextSongs);

      } catch (error) {
        console.error("Lỗi tải bài hát:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSongData();
    }
  }, [id]);

  if (loading) {
    return <div className="px-8 py-10 text-white">Đang tải bài hát...</div>;
  }

  if (!song) {
    return <div className="px-8 py-10 text-white">Song not found</div>;
  }

  const handlePlay = () => {
    // Đưa bài hiện tại và danh sách up next vào player
    player.loadPlaylist([song, ...upNextSongs]);
    player.play(song);
  };

  const toggleLike = (songId: string) => {
    setLikedSongs((prev) => ({
      ...prev,
      [songId]: !prev[songId],
    }));
  };

  // Dùng .songId thay vì .id
  const isMainSongLiked = likedSongs[song.songId];

  return (
    <>
      <div className="px-8 pt-10 pb-32 text-white bg-linear-to-b from-primary/5 to-transparent">
        {/* HERO SECTION */}
        <div className="flex flex-col md:flex-row md:items-end gap-10">
          {/* COVER */}
          <div className="relative group">
            {/* Đổi thành song.songImage */}
            <img
              className="w-48 h-48 md:w-64 md:h-64 rounded-xl bg-cover bg-center shadow-2xl transition-transform duration-300 group-hover:scale-[1.02] bg-gray-800"
              src={song.songImage || "https://placehold.co/400x400/1f2937/fff?text=No+Image"} 
              alt={song.name}
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

              {/* Đổi thành song.name */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                {song.name} 
              </h1>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-gray-400 text-sm">
                {/* Đổi thành song.artistName */}
                <span className="font-semibold text-white">{song.artistName || 'Unknown'}</span>
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
                title="Play song"
                onClick={handlePlay}
                className="flex h-12 min-w-[140px] items-center justify-center gap-2 rounded-full bg-primary px-8 font-bold text-black shadow-lg shadow-primary/20 hover:bg-hover transition-all active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined fill-current">
                  play_arrow
                </span>
                Play
              </button>

              {/* Add */}
              <button
                onClick={() => {
                  setSelectedSong(song);
                  setIsOpenAddModal(true);
                }}
                title="Add song to playlist"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#27313a] border border-[#3a4955] text-white hover:bg-[#3a4955] transition-all duration-300 cursor-pointer"
              >
                <span className="material-symbols-outlined text-2xl">add</span>
              </button>

              <button
                title={isMainSongLiked ? "Unlike this song" : "Like this song"}
                onClick={() => toggleLike(song.songId)}
                className={`flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer
                  ${isMainSongLiked ? "text-primary scale-110" : "text-gray-400 hover:text-primary"}`}
              >
                <span className={`material-symbols-outlined text-2xl`}>
                  favorite
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
            {upNextSongs.map((nextSong, index) => {
              const isNextSongLiked = likedSongs[nextSong.songId];

              return (
                <div
                  key={nextSong.songId}
                  className="group flex items-center gap-4 rounded-xl p-3 hover:bg-[#19282E]/50 transition-colors cursor-pointer"
                >
                  <div className="hidden lg:flex w-8 justify-center text-gray-400 group-hover:text-white">
                    {index + 1}
                  </div>

                  <img
                    className="h-12 w-12 rounded bg-cover bg-center bg-gray-800"
                    src={nextSong.songImage || "https://placehold.co/100x100/1f2937/fff?text=No+Image"}
                    alt={nextSong.name}
                  />

                  <div
                    onClick={() => {
                      player.loadPlaylist([song, ...upNextSongs]);
                      player.play(nextSong);
                    }}
                    className="flex flex-1 flex-col"
                  >
                    <p className="text-sm font-bold text-white hover:text-primary transition-all duration-300">
                      {nextSong.name}
                    </p>
                    <p className="text-xs text-gray-400">{nextSong.artistName || 'Unknown'}</p>
                  </div>

                  {/* Add Modal */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSong(nextSong);
                      setIsOpenAddModal(true);
                    }}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#27313a] border border-[#3a4955] text-white hover:bg-[#3a4955] transition-all duration-300 cursor-pointer opacity-0 group-hover:opacity-100"
                  >
                    <span className="material-symbols-outlined text-2xl">
                      add
                    </span>
                  </button>

                  {/* Like */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(nextSong.songId);
                    }}
                    className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 cursor-pointer
                      ${
                        isNextSongLiked
                          ? "text-primary scale-110"
                          : "text-gray-400 hover:text-primary"
                      }`}
                  >
                    <span className="material-symbols-outlined text-2xl">
                      favorite
                    </span>
                  </button>
                </div>
              );
            })}
            
            {upNextSongs.length === 0 && (
               <p className="text-gray-500 text-sm">Chưa có bài hát nào khác trong hệ thống.</p>
            )}
          </div>
        </div>
      </div>

      <AddSongToPlaylistModal
        isOpen={isOpenAddModal}
        song={selectedSong}
        onClose={() => {
          setIsOpenAddModal(false);
          setSelectedSong(null);
        }}
      />
    </>
  );
};

export default SongDetail;