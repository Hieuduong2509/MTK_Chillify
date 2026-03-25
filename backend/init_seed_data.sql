-- ======================
-- INIT EXTENSION
-- ======================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ======================
-- USERS
-- ======================
INSERT INTO users (full_name, email, password_hash)
SELECT
    'User ' || i,
    'user' || i || '@test.com',
    '123'
FROM generate_series(1, 5) AS s(i);

-- ======================
-- ARTISTS
-- ======================
INSERT INTO artists (artist_name)
VALUES
('Chill Artist'),
('Lo-fi Artist'),
('Focus Artist');

-- ======================
-- ALBUMS
-- ======================
INSERT INTO albums (album_name)
VALUES
('Chill Album'),
('Focus Album'),
('Night Album');

-- ======================
-- SONGS (15 RECORDS)
-- ======================
INSERT INTO songs (
    name,
    audio_url,
    duration,
    play_count,
    artist_id,
    album_id,
    created_at
)
SELECT
    'Song ' || i,
    'https://example.com/audio' || i || '.mp3',
    200 + (random() * 100)::int,
    (random() * 200)::int,
    a.id,
    al.id,
    NOW()
FROM generate_series(1, 15) AS s(i)
CROSS JOIN LATERAL (
    SELECT id FROM artists ORDER BY random() LIMIT 1
) a
CROSS JOIN LATERAL (
    SELECT id FROM albums ORDER BY random() LIMIT 1
) al;

-- ======================
-- PLAYLISTS
-- ======================
INSERT INTO playlists (user_id, playlist_name, description)
SELECT
    u.user_id,
    'Playlist of ' || u.full_name,
    'Auto generated playlist'
FROM users u;

-- ======================
-- PLAYLIST SONGS
-- ======================
INSERT INTO playlist_songs (playlist_id, song_id, position)
SELECT
    p.id,
    s.song_id,
    ROW_NUMBER() OVER ()
FROM playlists p
JOIN songs s ON TRUE
LIMIT 20;

-- ======================
-- PLAY HISTORY
-- ======================
INSERT INTO song_play_history (song_id, user_id, played_at)
SELECT
    s.song_id,
    u.user_id,
    NOW() - (random() * interval '7 days')
FROM songs s
CROSS JOIN users u
LIMIT 20;