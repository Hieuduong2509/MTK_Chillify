-- =========================
-- 1. CREATE USER (PascalCase)
-- =========================
INSERT INTO "users" (
    "UserId",
    "FullName",
    "Email",
    "PhoneNumber",
    "PasswordHash",
    "CreatedAt",
    "UpdatedAt"
)
SELECT 
    gen_random_uuid(),
    'Test User',
    'test@example.com',
    '0123456789',
    'hashed_password',
    NOW(),
    NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM "users"
);

-- =========================
-- 2. CREATE PLAYLIST
-- =========================
INSERT INTO "playlists" (
    "Id",
    "UserId",
    "PlaylistName",
    "Description",
    "PlaylistType",
    "CreatedAt",
    "UpdatedAt"
)
VALUES (
    gen_random_uuid(),
    (SELECT "UserId" FROM "users" LIMIT 1),
    'Chill Playlist',
    'Playlist for API testing',
    'USER',
    NOW(),
    NOW()
);

-- =========================
-- 3. OPTIONAL: ADD 1 SONG
-- =========================
INSERT INTO "playlist_songs" (
    "Id",
    "PlaylistId",
    "SongId",
    "Position",
    "AddedAt"
)
VALUES (
    gen_random_uuid(),
    (SELECT "Id" FROM "playlists" ORDER BY "CreatedAt" DESC LIMIT 1),
    (SELECT "SongId" FROM "songs" LIMIT 1),
    1,
    NOW()
);

-- =========================
-- 4. VERIFY
-- =========================
SELECT * FROM "users";
SELECT * FROM "playlists";
SELECT * FROM "playlist_songs";