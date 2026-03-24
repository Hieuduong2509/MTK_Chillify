import React, { useEffect, useState } from "react";
import { playlists, type Playlist } from "../../assets/dummyDB";

type AddSongToPlaylistModalProps = {
  isOpen: boolean;
  onClose: () => void;
  song: any;
};

const AddSongToPlaylistModal = ({
  isOpen,
  onClose,
  song,
}: AddSongToPlaylistModalProps) => {
  const INITIAL_COUNT = 5;

  const [visiblePlaylists, setVisiblePlaylists] = useState<Playlist[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const first = playlists.slice(0, INITIAL_COUNT);
    setVisiblePlaylists(first);
    setPage(1);
    setHasMore(playlists.length > INITIAL_COUNT);
  }, [isOpen]);

  const loadMore = () => {
    const nextPage = page + 1;
    const next = playlists.slice(0, nextPage * INITIAL_COUNT);

    setVisiblePlaylists(next);
    setPage(nextPage);

    if (next.length >= playlists.length) setHasMore(false);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 10 && hasMore) {
      loadMore();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1b2227] w-full max-w-md rounded-xl shadow-2xl border border-white/10 overflow-hidden relative"
      >
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold font-display">Add to Playlist</h2>
          <button
            onClick={onClose}
            className="absolute top-7 right-6 text-slate-400 hover:text-white cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div onScroll={handleScroll} className="flex-1 overflow-y-auto px-4">
          {visiblePlaylists.map((p) => (
            <label
              key={`playlist-${p.id}`}
              className="flex justify-between p-3 hover:bg-white/5 rounded-lg"
            >
              <div className="flex gap-3 items-center">
                <img src={p.cover} className="w-10 h-10 rounded" />
                <div>
                  <div>{p.name}</div>
                  <div className="text-xs text-gray-400">
                    {p.songs.length} songs
                  </div>
                </div>
              </div>
              <input
                className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
                type="checkbox"
              />
            </label>
          ))}
        </div>

        <div className="p-6 bg-surface-container border-t border-white/5">
          <button className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-bold transition-all duration-300 cursor-pointer">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSongToPlaylistModal;
