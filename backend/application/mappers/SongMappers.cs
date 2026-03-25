using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using application.DTOs.Song;
using application.models;
using application.models.jamendo;

namespace application.mappers
{
    public static class SongMappers
    {
        public static Song ToSongFromJamendoTrack(this JamendoTrack jamendoTrack)
        {
            return new Song
            {
                SongId = jamendoTrack.SongId,
                JamendoTrackId = jamendoTrack.Id,
                Name = jamendoTrack.Name,
                AudioUrl = jamendoTrack.Audio,
                Duration = jamendoTrack.Duration,
                SongImage = jamendoTrack.Image,
                ReleaseDate = jamendoTrack.ReleaseDate,
                PlayCount = 0,
                ArtistId = jamendoTrack.ArtistId,
                AlbumId = jamendoTrack.AlbumId,
                ArtistName = jamendoTrack.ArtistName
            };
        }

        public static SongResponseDto ToSongDtoFromJamendoTrack(this JamendoTrack jamendoTrack)
        {
            return new SongResponseDto
            {
                SongId = jamendoTrack.SongId,
                JamendoTrackId = jamendoTrack.Id,
                Name = jamendoTrack.Name,
                AudioUrl = jamendoTrack.Audio,
                Duration = jamendoTrack.Duration,
                SongImage = jamendoTrack.Image,
                ReleaseDate = jamendoTrack.ReleaseDate,
                PlayCount = 0,
                ArtistName = jamendoTrack.ArtistName
            };
        }

        public static SongResponseDto ToSongDtoFromSongModel(this Song song)
        {
            return new SongResponseDto
            {
                SongId = song.SongId,
                JamendoTrackId = song.JamendoTrackId,
                Name = song.Name,
                AudioUrl = song.AudioUrl,
                Duration = song.Duration,
                SongImage = song.SongImage,
                ReleaseDate = song.ReleaseDate,
                PlayCount = song.PlayCount,
                ArtistName = song.ArtistName
            };
        }
    }
}