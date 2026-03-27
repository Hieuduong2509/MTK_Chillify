import { useNavigate } from "react-router-dom";
import { player } from "../../core/player/Player";
// Nhớ import usePlaylist từ Context
import { usePlaylist } from "../../context/PlaylistContext"; 

const SongCard = ({ song }: { song: any }) => {
  const navigate = useNavigate();
  
  // 1. LẤY ĐÚNG 2 THỨ NÀY TỪ CONTEXT:
  const { likedSongIds, toggleLikeSong } = usePlaylist();

  // 2. Kiểm tra xem bài hát đã like chưa (Để làm sáng icon)
  const isLiked = likedSongIds.includes(song.id);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    player.play(song.originalData || song);
  };

  const handleCardClick = () => {
    navigate(`/song/${song.id}`);
  };

  // 3. HÀM XỬ LÝ KHI BẤM TIM (ĐÃ SỬA LỖI CHÍ MẠNG)
  const handleLikeClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn click xuyên qua thẻ cha để không bị nhảy trang

    if (!localStorage.getItem("token")) {
        alert("Vui lòng đăng nhập để thực hiện chức năng này!");
        return;
    }

    // GỌI ĐÚNG HÀM TỪ CONTEXT: Nó sẽ tự động lo việc Thêm/Xóa API và cập nhật giao diện
    await toggleLikeSong(song.id); 
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative flex flex-col gap-3 p-3 lg:p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-lg">
        <img
          src={song.image}
          alt={song.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 bg-gray-800"
        />
        
        {/* Nút Play hiển thị khi hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
          <button
            onClick={handlePlay}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-black shadow-xl hover:scale-105 hover:bg-hover transition-all"
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

      {/* 4. NÚT TRÁI TIM CHUẨN XỊN */}
      <button
        onClick={handleLikeClick} // GỌI HÀM VỪA SỬA LẠI
        title={isLiked ? "Unlike" : "Like"} 
        className={`absolute top-5 right-5 z-10 p-2 rounded-full backdrop-blur-sm transition-all duration-300
          ${isLiked 
            ? "bg-primary text-black opacity-100 scale-110" // Sáng rực rỡ nếu đã Like
            : "bg-black/40 text-white opacity-0 group-hover:opacity-100 hover:text-primary" // Tàng hình nếu chưa Like
          }`}
      >
        <span className={`material-symbols-outlined text-xl ${isLiked ? 'fill-current' : ''}`}>
          favorite
        </span>
      </button>

    </div>
  );
};

export default SongCard;