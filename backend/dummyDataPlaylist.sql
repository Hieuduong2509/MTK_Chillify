-- =========================
-- USERS
-- =========================
INSERT INTO users (full_name, email, phone_number, password_hash)
VALUES
('Test User', 'test@example.com', '0123456789', 'hashed_password');

-- =========================
-- PLAYLIST
-- =========================
INSERT INTO playlists (
    user_id,
    playlist_name,
    description,
    playlist_type,
    created_at,
    updated_at
)
VALUES (
    (SELECT user_id FROM users LIMIT 1),
    'Chill Playlist',
    'Playlist for API testing',
    'USER',
    NOW(),
    NOW()
);

-- =========================
-- ADD 1 SONG INTO PLAYLIST
-- =========================
INSERT INTO playlist_songs (
    id,
    playlist_id,
    song_id,
    position,
    added_at
)
VALUES (
    gen_random_uuid(),
    (SELECT id FROM playlists ORDER BY created_at DESC LIMIT 1),
    (SELECT song_id FROM songs LIMIT 1),
    1,
    NOW()
);

-- =========================
-- VERIFY
-- =========================
SELECT * FROM users;
SELECT * FROM playlists;
SELECT * FROM playlist_songs;

INSERT INTO playlists (
    user_id,
    playlist_name,
    playlist_type
)
VALUES (
    (SELECT user_id FROM users LIMIT 1),
    'Liked Songs',
    'LIKED'
);