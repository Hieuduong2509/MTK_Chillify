import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home/Home";
import SectionDetail from "./pages/home/SectionDetail";
import Profile from "./pages/account/Profile";
import ChangePassword from "./pages/account/ChangePassword";
import MyPlaylist from "./pages/playlist/MyPlaylist";
import PlaylistDetail from "./pages/playlist/PlaylistDetail";
import SongDetail from "./pages/song/SongDetail";
import NotFound from "./pages/404/NotFound";
import Account from "./pages/account/Account";
import LikedSongs from "./pages/like-songs/LikedSongs";
import PrivateRoute from "./routes/PrivateRoute";

// IMPORT CÁC PROVIDER
import { PlaylistProvider } from "./context/PlaylistContext";
import { SongProvider } from "./context/SongContext";
// import { AuthProvider } from "./context/AuthContext"; // Bật dòng này nếu bạn dùng AuthContext

function App() {
  return (
    /* Bọc các Provider ở cấp cao nhất của Routes */
    <SongProvider>
      <PlaylistProvider>
        <Routes>
          {/* Auth routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          {/* Main routes */}
          <Route element={<PrivateRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />}></Route>
              <Route
                path="/section/:sectionId"
                element={<SectionDetail />}
              ></Route>

              <Route path="/account" element={<Account />}></Route>
              <Route path="/account/profile" element={<Profile />}></Route>
              <Route
                path="/account/change-password"
                element={<ChangePassword />}
              ></Route>

              <Route path="/playlists" element={<MyPlaylist />}></Route>
              <Route path="/playlists/:id" element={<PlaylistDetail />}></Route>

              <Route path="/liked-songs" element={<LikedSongs />} />

              <Route path="/song/:id" element={<SongDetail />}></Route>
            </Route>
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PlaylistProvider>
    </SongProvider>
  );
}

export default App;
