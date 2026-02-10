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

export const forYouSongs: Song[] = [
  {
    id: 1,
    title: "Morning Chill",
    artist: "Daily Mix 1",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCYo2Kb7W9sq3uVfCP91NqvJcHiAHRsef0QLPLZFYNZ-tBjy52I-MilEtA26AWFEvHxebqU5MRnqelNIbwuVYYoKo2uvXzbfw5bbl2e8fPEVCirRJXcX-GJWbsCkmtWm5Ag7FS58dBF3CuOC8-1w1jPxnEurWME8fa-XjdOddROVBJKE4c7HJ3A5zffcdhbu2qudaHtR8ljzHl5ssl9J2sC6iKKWBAyIxiMKlD-mEZHz6r-hVX_hYA5taTFQRvdA064QQXj66HDnDgZ",
  },
  {
    id: 2,
    title: "Discover Weekly",
    artist: "Fresh tracks for you",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuApsjWrn6KSwwXilTmo33368FwNG6nVErDIFwCXa-tAAeYHt82WoyYJL1bHF0JZRr-vUOFDJE0jb0b-5Na7bSlyliKSBhjCwwA4oBCU9jAr84wde7iSKmwbvZubVcR2nEpZCH_Y5B1Vda_J4uY8VNAR2X5q-mQXjp2Imb3V-pcOzsuEoiLQ_d_wGUnTy8sejTzfqLs4Z3yLqXjFgI9mnbgbdKs4mpXE3GgostqLnYs-jmWqJ5Y8dN-c00Bs9H8E9pJ4DYaTBNkX8eBj",
  },
  {
    id: 3,
    title: "Festival Vibes",
    artist: "Fresh tracks for you",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBm9Lkws8kl9HsIs-kPXtfel7qFLDtWHjCUewpmZlHChBADV1pcvpgOBC9edw1rJYXbLY8LRKgSkdfgm4B54hl55znAM7FoW9aHu1RFVBrxGTpX-EPCMiPNHYcIgCqAPoAmKU7jKVq9Gh5R2UTUGvdN7VeUSvWH6lhiHG9JzuARz7I5sFaytMCxtfj6eCjsMONijCK2FPFGMTUzEx1RGz6Bf-HlaLPlkAUmCKl2eRmgKSjsuFKU7xf8wJqR1piRSCiL4OMs2Q0HZzyQ",
  },
  {
    id: 4,
    title: "Discover Weekly",
    artist: "Various Artists",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCQDMLSs1zRYpppKZbHyPDS88U5szn8eyG3ztTWMp7EogAMf1EWjFIdLtEXGeIfO0drJ4RkcYD326LwOhQFPtQrxo0We-DOLlvc0F_vIC7EH_P2YUnHGvMcpHD0o0ptW4AuXMir4qPTDhEyJqH5KTsnnbytBd77tHz_VJ_gWKqqwVYaJd1lueAl-D63BjL62Th4LF95mB3DdA5_u_NrU0pU2vidELpULFt38yVxOVtxIRFS7aOgJVSs7rU6ehzE4NRYyIUQHAyh99Ol",
  },
];
export const popularSongs: Song[] = [
  {
    id: 1,
    title: "City Lights",
    artist: "Urban Pulse",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCtchLmyw3ZVYjWWRZA-fDp6cb8rvf-KJ5CPrSrXMe0LckxtlBrPxFYifyZ8MZainyJulA9_LWATvRuKg47yVlqysrVrle1iH2AAcy7ZM-4iOEaLR5Qv5KQLx2GHNELfXnOPy5LSwf4mLssUZNWe9bCHloZuseeFOiTNt8QGFq3Pju0l37MZSJFDBnnolkWS2X4UaIpXr5C1TYzmeNjMnwMrm_kqIlkl-6ZtkksGKKPOn_hfJ71p0O1zTvQDoVpm64vU7b_RzXiJTOv",
  },
  {
    id: 2,
    title: "Golden Era",
    artist: "Classic Beats",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD9Zf9gl-4AXznLt7KnwSjbMan-3Dr7R0LeFq9mg0UjaUf3A7xJMTppDBouoOZl3yiU5gCpmDsYDhuaI7D39iGxLIeRvedevI5vhUISG0orHq3L3m2m20lCY1ZyrsqCRQEz3DGuqXYYJ9FrPGR_T--gEoi2TQ8Vs_FhvBDTFqU1aF2COiDruoXeXNUiP7h6PLC1S49O53m1uNAfl3rXZKqbKEpJp_8M0v5bxW2zIOJGNhewvCqBjQpqGEZLEVinttY7_beUB_pcW-Ng",
  },
  {
    id: 3,
    title: "Dusk to Dawn",
    artist: "Atmospheric",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDLdw2Qkpqc6BjEXcJ9urpLehvuqmWfaI59KXYAqr17a2mhn6RRIDHMkjTLqYMk9SE4fuAjrNiJ_3TVyHGBRQhGTWiBdd-Fanc2s1WMkeiHuK2_hU9Rj_38KsLj9M7tPuUG-r0widrHONDR2G-qsk-zx0B0xcud7Qv4Yx5Dg-qKVL7PjTGVw_2rbR90mNNbUEgttBx4Hhj4DCEWYn07m5Sqx472tCTWRK4Ui7pnbN1nPl5Z_mTy7QfpIjeOuMmygea1cczEs6UmSDmA",
  },
];
