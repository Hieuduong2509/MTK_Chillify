import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import ProgressBar from "../components/ProgressBar";
import { player } from "../core/player/Player";

const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    const observer = {
      onSongChange: (song: any) => {
        setShowPlayer(!!song);
      },
      onStateChange: () => {},
      onTimeChange: () => {},
    };

    player.subscribe(observer as any);
    return () => player.unsubscribe(observer as any);
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      />

      <div className="flex flex-col flex-1">
        <Header />

        <main className={`flex-1 ${showPlayer ? "pb-24" : ""}`}>
          <Outlet />
        </main>

        {showPlayer && <ProgressBar />}

        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
