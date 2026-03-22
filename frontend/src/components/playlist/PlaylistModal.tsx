import React, { useEffect, useState } from "react";

type Mode = "create" | "edit";

interface PlaylistModalProps {
  isOpen: boolean;
  mode: Mode;
  initialData?: {
    id?: string;
    name: string;
    description: string;
  };
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const PlaylistModal = ({
  isOpen,
  mode,
  initialData,
  onClose,
  onSubmit,
}: PlaylistModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName(initialData?.name || "");
      setDescription(initialData?.description || "");
    }
  }, [isOpen, initialData]);

  const handleSubmit = () => {
    if (!name.trim()) return;

    if (mode === "create") {
      onSubmit({ name, description });
    } else {
      onSubmit({
        id: initialData?.id,
        name,
        description,
      });
    }

    onClose();
  };

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
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="p-6">
          <h2 className="text-xl font-bold font-display mb-6">
            {mode === "create" ? "New Playlist" : "Edit Playlist"}
          </h2>

          <div className="space-y-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter playlist name"
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Give your playlist a description"
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white resize-none"
            />
          </div>

          <div className="mt-8">
            <button
              onClick={handleSubmit}
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-bold transition-all cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistModal;
