using System;
using Chillify.Application.Models; 
using application.models;

namespace application.models 
{
    public class PlaylistSong
    {
        public Guid PlaylistId { get; set; }
        public Guid SongId { get; set; }
        public int Position { get; set; }
        public DateTime AddedAt { get; set; }

        // Các Navigation properties
        public Playlist Playlist { get; set; } = null!;
        public Song Song { get; set; } = null!;
    }
}