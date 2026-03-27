import logo from "./remove_bg.png";
import logo2 from "./7_cut.png";
import like_songs_img from "./liked_songs_img.png";
import { trendingSongs } from "./dummyDB";

// ============= SIDEBAR ITEMS =============

export const assets = {
  logo,
  logo2,
  like_songs_img,
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
  // {
  //   id: 2,
  //   title: "New",
  //   songs: forYouSongs,
  // },
  // {
  //   id: 3,
  //   title: "Discover",
  //   songs: popularSongs,
  // },
];

export const sections = [
  { id: "trending", title: "Trending" },
  { id: "new", title: "New Releases" },
  { id: "discover", title: "Discover" },
];
