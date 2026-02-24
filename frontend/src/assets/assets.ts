import { forYouSongs, popularSongs, trendingSongs } from "./dummyDB";
import logo from "./remove_bg.png";
import logo2 from "./7_cut.png";

// ============= SIDEBAR ITEMS =============

export const assets = {
  logo,
  logo2,
};

type MenuItem =
  | {
      icon: string;
      label: string;
      path: string;
      danger?: false;
    }
  | {
      icon: string;
      label: string;
      danger: true;
    };

export const menuItems: MenuItem[] = [
  { icon: "home", label: "Home", path: "/" },
  { icon: "library_music", label: "My Playlists", path: "/playlists" },
  { icon: "favorite", label: "Liked Songs", path: "/liked-songs" },
  { icon: "person", label: "Account", path: "/account" },
  { icon: "logout", label: "Logout", danger: true },
];

// ============= HOME SECTIONS =============
export const homeSections = [
  {
    id: 1,
    title: "Trendings",
    songs: trendingSongs,
  },
  {
    id: 2,
    title: "For you",
    songs: forYouSongs,
  },
  {
    id: 3,
    title: "Popular",
    songs: popularSongs,
  },
];
