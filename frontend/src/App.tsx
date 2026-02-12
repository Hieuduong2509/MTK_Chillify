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

function App() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Route>

      {/* Main routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/section/:id" element={<SectionDetail />}></Route>

        <Route path="/account" element={<Account />}></Route>
        <Route path="/account/profile" element={<Profile />}></Route>
        <Route
          path="/account/change-password"
          element={<ChangePassword />}
        ></Route>

        <Route path="/playlists" element={<MyPlaylist />}></Route>
        <Route path="/playlists/:id" element={<PlaylistDetail />}></Route>

        <Route path="/song/:id" element={<SongDetail />}></Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
