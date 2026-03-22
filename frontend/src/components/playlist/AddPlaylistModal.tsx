import React from "react";

interface AddPlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPlaylistModal = ({ isOpen, onClose }: AddPlaylistModalProps) => {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-[#1b2227] w-full max-w-md rounded-xl shadow-2xl border border-white/10 overflow-hidden relative transform transition-all duration-300 
        ${isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-2 opacity-0"}`}
      >
        <button className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer">
          <span className="material-symbols-outlined" onClick={onClose}>
            close
          </span>
        </button>
        <div className="p-6">
          <h2 className="text-xl font-bold font-display mb-6">New Playlist</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                Name
              </label>
              <input
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder:text-slate-500 transition-all"
                placeholder="Enter playlist name"
                type="text"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                Description
              </label>
              <textarea
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder:text-slate-500 transition-all resize-none"
                placeholder="Give your playlist a description"
                rows={4}
              ></textarea>
            </div>
          </div>
          <div className="mt-8">
            <button className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-bold transition-all cursor-pointer">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlaylistModal;
