// ============= SONG CARD =============

export interface Song {
  id: number;
  title: string;
  artist: string;
  image: string;
}

export const trendingSongs: Song[] = [
  {
    id: 1,
    title: "Neon Nights",
    artist: "Synthetix",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuApmj1Vj2d67nR06EaN0P720J_HJibEUIq7cEO9qTk2KwhZxxzawxw1I70jl8A-_S0L9jprgf3o4Ck2UveiCs38nYaPYpWqkxSAwYHimo3ViVI39OaMjBEPwrGY8afZ6Ssg37e9q8wDa12xsd-tGI46AlEZEISV6qa1XNNW99_q256mNpGirGVk916NvuiJYzEa3VF_F_Tg7in_DsyPsSrFoZkMVjNfCFNf3hwRNjxx2kvqkci___Si18on3mRN7rjM8OVS6WTY6Ipj",
  },
  {
    id: 2,
    title: "After Hours",
    artist: "The Echo",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCYTk2moT8C4wXhqe_m7-WwdRtN7QkFKMFYHBWUTJOR3UKbOC3lpHt0vmeOI0aMu2wEvAvwNjlPJTfeyqIcP_BZKvbgKX9W9CBNUHT1sIABnj8YWaCHRSu5WfnX3o9-e2Ng5z_5_p0UYlsxzM5giQ5oeGTjMA_SvH5vT32JhwGb_H4faoXEJr45F_c1TxGkYQWBiHcxxQBq9vUyigNSKV_1SItHj3RYR1rSNfMls4nXPsc40_VaNiYkDIP8JIcQWY-Sd2GmzzHFJPuE",
  },
  {
    id: 3,
    title: "Electric Sky",
    artist: "Skyline",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA91rARqikzpkStJ-BHsC-kkdOKWu8z6-r-54GWMu_DY4wi-hsXWU8nE5aQAT2GFEhFVfvHyMqJdXl3QVguOQA0r2XEgGnLnk9rlZ_9-QwZ0Eo8TXboLGX11syDDid38IxG8mty7lS3P4nfw_zwgxdSjtlyjvoIP6AwCS3ERSoLEVS7Fn6OiHQVFdbse8IN65AF_Qxyx9qbVN4kdonuTcGALvT8mj8EjnhZTTvx4eM1IYZJEVCkPh-O0UCmtu8wCJKjGwqswk2utx6Q",
  },
  {
    id: 4,
    title: "Wild Heart",
    artist: "Solstice",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAaKoWF2AgNeVwEvP7fOu-6DZ8Zqbn3OS1iIA7imO8g9L2cf3JvVVfpp2uqamaZJdSH0H2vP9magRs5d54S1qgKEkaalMGrS_Kb2VPDA6bIwqKPgFbUg-0VKiatHfGpQTxpM-qcgg7sI6KqBuexGh2Ylz3qUTrlxwbCD00gecJhI7F1i31zuVAzGbI6dW0xsaHMLgMLUk_oIZa8OGCwkOzCWT3bRohZ9tDIpyo8X_fsYUoDdKEmCAdGE_LuP5atIEFDV2U3Pf_KsVcS",
  },
  {
    id: 5,
    title: "Lost in Echoes",
    artist: "The Waves",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBxr7nSjNAr_h688RzamNjHa_eFXWOEjwlnhfBJMy0e7iP8aCb4w8EYpcZRDnqIQ2m6bwKyLaeoyvEgvHU1bWq6KcbpvvbJC_N2YYbzVtNKQkWeGe73d6VDmiATpUXnUX9F8BDfZ2clvsE-6BGb9Obcz8cdqXUyDNp07wZa5dJG67h6n5P9CmptqLqELTZAG-51kwTt89rdaLMp5GAwllvSTef6qXI_nWcKyYOuVH0CzOxN6-ulflWMYvlBs70P1XPv6v_BUKaoisXx",
  },
  {
    id: 6,
    title: "Deep Blue",
    artist: "Marina",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCu6ZkmaeugCZIkYXNjLPQgU3TFzWZcqixANislUU7BeVSDmtrWi4zKn2DLP02MI9wJMXZquvC-44c1KQ_oxsbyS8APSQF3N9SHeBKX9Ps-oneTy-AqfWw08ItIKprUab7sRJyCzlJOqcVtsBZFrPvBghYe4Veq1WVdw2btV80p3bk2ERzDqOIhEFGkysm0BuLieU3NjFdamHkEWZRQu8f0M5MeQL0YgEnfKkFcM7Q_xiG5xPEvOTrpvitkTUxifkJRd7p0Fa2tJl6u",
  },
  {
    id: 7,
    title: "Deep Blue",
    artist: "Marina",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCu6ZkmaeugCZIkYXNjLPQgU3TFzWZcqixANislUU7BeVSDmtrWi4zKn2DLP02MI9wJMXZquvC-44c1KQ_oxsbyS8APSQF3N9SHeBKX9Ps-oneTy-AqfWw08ItIKprUab7sRJyCzlJOqcVtsBZFrPvBghYe4Veq1WVdw2btV80p3bk2ERzDqOIhEFGkysm0BuLieU3NjFdamHkEWZRQu8f0M5MeQL0YgEnfKkFcM7Q_xiG5xPEvOTrpvitkTUxifkJRd7p0Fa2tJl6u",
  },
];

// ============= PLAYLIST =============

export interface Playlist {
  id: string;
  name: string;
  cover: string;
  description?: string;
  songs: Song[];
}

export const playlists: Playlist[] = [
  {
    id: "lofi",
    name: "Midnight Lo-Fi",
    description:
      "Relaxing beats for late night coding sessions, deep focus, and midnight rainy vibes.",
    cover:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    songs: trendingSongs.slice(0, 5),
  },
  {
    id: "summer",
    name: "Summer Hits 2024",
    cover:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    description: "Hot tracks for the summer season.",
    songs: trendingSongs.slice(0, 5),
  },
  {
    id: "chill",
    name: "Late Night Chill",
    cover:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    description: "Relaxing beats for night sessions.",
    songs: trendingSongs.slice(0, 5),
  },
  {
    id: "workout",
    name: "Workout Energy",
    cover:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    description: "High energy tracks to boost performance.",
    songs: trendingSongs.slice(0, 5),
  },
  {
    id: "roadtrip",
    name: "Road Trip Mix",
    cover:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    description: "Perfect soundtrack for long drives.",
    songs: trendingSongs.slice(0, 5),
  },
  {
    id: "indie",
    name: "Indie Discoveries",
    cover:
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29",
    description: "Fresh indie music selections.",
    songs: trendingSongs.slice(0, 5),
  },
  {
    id: "classic",
    name: "Classic Rock Essential",
    cover:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
    description: "Legendary rock anthems.",
    songs: trendingSongs.slice(0, 5),
  },
];

