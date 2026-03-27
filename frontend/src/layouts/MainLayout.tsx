import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import { Outlet, useNavigate } from "react-router-dom"; // Import useNavigate
import Footer from "../components/common/Footer";
import ProgressBar from "../components/common/ProgressBar";
import { player } from "../core/player/Player";

const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const navigate = useNavigate(); // Hook để chuyển hướng

  useEffect(() => {
    // 1. KIỂM TRA ĐĂNG NHẬP
    const token = localStorage.getItem("token");
    if (!token) {
      // Nếu không có token, đẩy về trang login ngay lập tức
      // replace: true để người dùng không bấm "Back" quay lại được
      navigate("/login", { replace: true });
      return;
    }

    // 2. LOGIC PLAYER (Giữ nguyên của bạn)
    const observer = {
      onSongChange: (song: any) => {
        setShowPlayer(!!song);
      },
      onStateChange: () => {},
      onTimeChange: () => {},
    };

    player.subscribe(observer as any);
    return () => player.unsubscribe(observer as any);
  }, [navigate]); // Thêm navigate vào dependency array

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