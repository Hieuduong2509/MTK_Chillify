import { useMediaQuery } from "react-responsive";
import { sections } from "../../assets/assets";
import SongCard from "../../components/song/SongCard";
import { useNavigate } from "react-router-dom";
import { useSong } from "../../context/SongContext";
import { useEffect } from "react";

const Home = () => {
  const { songsByType, getSongsByType, loading } = useSong();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const MAX_SONG_ITEM = isMobile ? 4 : 6;

  useEffect(() => {
    sections.forEach((section) => {
      getSongsByType(section.id);
    });
  }, []);

  return (
    <div className="px-4 md:px-7 py-4 md:py-6 space-y-8 pb-24">
      {sections.map((section) => {
        const songs = songsByType[section.id] || [];
        const previewSongs = songs.slice(0, MAX_SONG_ITEM);

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

            {loading && songs.length === 0 ? (
              <p className="text-white">Loading...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {previewSongs.map((song) => (
                  <SongCard key={`song-${song.id}`} song={song} />
                ))}
              </div>
            )}
            {/* <div
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
            </div> */}
          </section>
        );
      })}
    </div>
  );
};

export default Home;
