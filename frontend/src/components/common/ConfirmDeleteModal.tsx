import React from 'react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText: string;
  onClose: () => void;
  onConfirm: () => void; 
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  title,
  description,
  confirmText,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#282828] p-6 rounded-xl shadow-2xl max-w-sm w-full text-white border border-white/10">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-400 mb-6">{description}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 hover:text-white transition cursor-pointer">Cancel</button>
          <button 
            onClick={onConfirm} 
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-full font-bold transition cursor-pointer"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal; 