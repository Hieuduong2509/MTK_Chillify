CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE TYPE playlist_type_enum AS ENUM ('USER', 'LIKED', 'SYSTEM');

CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone_number TEXT,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE artists (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    jamendo_artist_id TEXT UNIQUE,
    artist_name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE albums (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    jamendo_album_id TEXT UNIQUE,
    album_name TEXT NOT NULL,
    album_image TEXT,
    release_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE songs (
    song_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    jamendo_track_id TEXT UNIQUE,
    name TEXT NOT NULL,
    audio_url TEXT NOT NULL,
    duration INT,
    song_image TEXT,
    release_date DATE,
    play_count INT DEFAULT 0,
    
    artist_id TEXT,
    artist_name TEXT,
    album_id TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);
CREATE TABLE playlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    playlist_name TEXT NOT NULL,
    description TEXT,
    playlist_type playlist_type_enum DEFAULT 'USER',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_playlist_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);
CREATE TABLE playlist_songs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    playlist_id UUID NOT NULL,
    song_id UUID NOT NULL,
    position INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_ps_playlist
        FOREIGN KEY (playlist_id)
        REFERENCES playlists(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_ps_song
        FOREIGN KEY (song_id)
        REFERENCES songs(song_id)
        ON DELETE CASCADE,

    CONSTRAINT unique_playlist_song
        UNIQUE (playlist_id, song_id),

    CONSTRAINT unique_playlist_position
        UNIQUE (playlist_id, position)
);
CREATE TABLE song_play_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    song_id UUID NOT NULL,
    user_id UUID,
    played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_sph_song
        FOREIGN KEY (song_id)
        REFERENCES songs(song_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_sph_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE SET NULL
);
-- Song play history
CREATE INDEX idx_sph_song_id 
ON song_play_history(song_id);

CREATE INDEX idx_sph_user_played_at 
ON song_play_history(user_id, played_at DESC);

-- Playlist songs
CREATE INDEX idx_ps_playlist_id 
ON playlist_songs(playlist_id);

CREATE INDEX idx_ps_song_id 
ON playlist_songs(song_id);

-- Songs
CREATE INDEX idx_songs_artist_id 
ON songs(artist_id);

CREATE INDEX idx_songs_album_id 
ON songs(album_id);
