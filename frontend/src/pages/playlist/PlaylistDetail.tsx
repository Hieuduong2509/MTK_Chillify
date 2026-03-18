import { useParams } from "react-router-dom";
import { playlists } from "../../assets/dummyDB";
import { player } from "../../core/player/Player";

const PlaylistDetail = () => {
  const { id } = useParams<{ id: string }>();

  const playlist = playlists.find((p) => p.id === id);

  if (!playlist) {
    return <div className="px-8 py-10 text-white">Playlist not found</div>;
  }

  const handlePlayAll = () => {
    if (playlist.songs.length === 0) return;
    player.loadPlaylist(playlist.songs);
    player.play(playlist.songs[0]);
  };

  const handlePlaySong = (song: any) => {
    player.loadPlaylist(playlist.songs);
    player.play(song);
  };

  return (
    <div className="px-8 pt-6 pb-24 text-white">
      {/* HEADER */}
      <section className="flex flex-col md:flex-row gap-8 items-start md:items-end">
        {/* Cover */}
        <div className="shrink-0">
          <div
            className="w-48 h-48 md:w-64 md:h-64 rounded-xl shadow-2xl bg-cover bg-center"
            style={{ backgroundImage: `url(${playlist.cover})` }}
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Public Playlist
          </span>

          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight">
            {playlist.name}
          </h1>

          {playlist.description && (
            <p className="text-gray-400 max-w-2xl">{playlist.description}</p>
          )}

          <div className="flex items-center gap-2 text-sm text-white/90 mt-2">
            <span className="font-bold">MusicStream</span>
            <span className="text-gray-500">•</span>
            <span>124,532 likes</span>
            <span className="text-gray-500">•</span>
            <span>{playlist.songs.length} songs</span>
          </div>
        </div>
      </section>

      {/* ACTION BUTTONS */}
      <section className="flex items-center gap-6 mt-8 mb-6">
        <button
          onClick={handlePlayAll}
          className="w-14 h-14 flex items-center justify-center rounded-full bg-primary text-black hover:scale-105 transition shadow-lg shadow-primary/30"
        >
          <span className="material-symbols-outlined text-4xl fill-icon cursor-pointer">
            play_arrow
          </span>
        </button>

        <button className="text-gray-400 hover:text-primary transition cursor-pointer">
          <span className="material-symbols-outlined text-3xl">favorite</span>
        </button>

        <button className="text-gray-400 hover:text-primary transition cursor-pointer">
          <span className="material-symbols-outlined text-3xl">
            download_for_offline
          </span>
        </button>

        <button className="text-gray-400 hover:text-primary transition cursor-pointer">
          <span className="material-symbols-outlined text-3xl">more_horiz</span>
        </button>
      </section>

      {/* TABLE HEADER */}
      <div
        className="grid grid-cols-[auto_1fr_auto]
        md:grid-cols-[auto_1fr_1fr_auto]
        lg:grid-cols-[auto_1fr_1fr_1fr_auto] gap-4 px-4 py-3 border-b border-white/10 text-gray-400 text-xs font-bold uppercase tracking-wider"
      >
        <div className="w-8 text-center">#</div>
        <div>Title</div>
        <div className="hidden md:block">Album</div>
        <div className="hidden lg:block">Date Added</div>
        <div className="w-16 text-right">
          <span className="material-symbols-outlined text-sm">schedule</span>
        </div>
      </div>

      {/* SONG LIST */}
      <div className="mt-2 flex flex-col">
        {playlist.songs.map((song, index) => (
          <div
            key={song.id}
            onClick={() => handlePlaySong(song)}
            className="grid grid-cols-[auto_1fr_auto]
          md:grid-cols-[auto_1fr_1fr_auto]
          lg:grid-cols-[auto_1fr_1fr_1fr_auto] gap-4 px-4 py-3 items-center rounded-lg hover:bg-white/5 group transition cursor-pointer"
          >
            {/* Number / Play */}
            <div className="w-8 text-center text-gray-500 text-sm group-hover:hidden">
              {index + 1}
            </div>

            <div className="w-8 text-center text-primary hidden group-hover:block">
              <span className="material-symbols-outlined text-base fill-icon">
                play_arrow
              </span>
            </div>

            {/* Title */}
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded bg-cover bg-center shrink-0"
                style={{ backgroundImage: `url(${song.image})` }}
              />

              <div className="flex flex-col min-w-0">
                <span className="text-white text-sm font-semibold truncate group-hover:text-primary transition-all duration-300">
                  {song.title}
                </span>
                <span className="text-gray-400 text-xs truncate">
                  {song.artist}
                </span>
              </div>
            </div>

            {/* Album */}
            <div className="hidden md:block text-gray-400 text-sm truncate">
              —
            </div>

            {/* Date */}
            <div className="hidden lg:block text-gray-400 text-sm truncate">
              —
            </div>

            {/* Duration */}
            <div className="w-16 text-right text-gray-400 text-sm">3:45</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistDetail;
