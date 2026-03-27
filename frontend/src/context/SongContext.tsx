import React, { createContext, useContext, useState } from "react";

interface SongContextType {
  currentSong: any;
  setCurrentSong: (song: any) => void;
}

const SongContext = createContext<SongContextType | undefined>(undefined);

export const SongProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Sửa lại chỗ này: đã xóa phần "songCount?: number;" bị dính vào
  const [currentSong, setCurrentSong] = useState<any>(null);

  return (
    <SongContext.Provider value={{ currentSong, setCurrentSong }}>
      {children}
    </SongContext.Provider>
  );
};

export const useSong = () => {
  const context = useContext(SongContext);
  if (!context) throw new Error("useSong phải nằm trong SongProvider");
  return context;
};

export default SongContext;