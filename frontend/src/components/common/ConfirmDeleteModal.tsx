import React, { useState } from "react";

type ConfirmDeleteModalProps = {
  isOpen: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  onClose: () => void;
};

const ConfirmDeleteModal = ({
  isOpen,
  title,
  description,
  confirmText,
  onClose,
}: ConfirmDeleteModalProps) => {
  if (!isOpen) {
    return null;
  }

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
        {/* <!-- Close Button --> */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="p-6">
          <div className="text-center">
            <h3 className="text-xl font-bold font-display text-white mb-2">
              {title}
            </h3>
            <p className="text-slate-400 text-sm">{description}</p>
          </div>

          <div className="mt-5">
            <button className="w-full bg-red-400 hover:bg-red-500 text-white py-3 rounded-lg font-bold transition-all duration-300 cursor-pointer">
              {confirmText || "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
