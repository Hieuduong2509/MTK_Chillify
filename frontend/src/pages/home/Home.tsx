import { useMediaQuery } from "react-responsive";
import { homeSections } from "../../assets/assets";
import ProgressBar from "../../components/ProgressBar";
import SongCard from "../../components/SongCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const MAX_SONG_ITEM = isMobile ? 4 : 6;
  return (
    <div className="px-4 md:px-7 py-4 md:py-6 space-y-8 pb-24">
      {homeSections.map((section) => {
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
              {previewSongs.map((song) => (
                <SongCard key={`song-${song.id}`} song={song} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Home;
