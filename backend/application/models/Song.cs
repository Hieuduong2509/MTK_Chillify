using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace application.models
{
    [Table("songs")]
    public class Song
    {
        [Key]
        [Column("song_id")]
        public Guid SongId { get; set; }
        
        [Column("jamendo_track_id")]
        public string? JamendoTrackId { get; set; }
        
        [Column("name")]
        public string Name { get; set; } = string.Empty;
        
        [Column("audio_url")]
        public string AudioUrl { get; set; } = string.Empty;
        
        [Column("duration")]
        public int? Duration { get; set; }
        
        [Column("song_image")]
        public string? SongImage { get; set; }
        
        [Column("release_date")]
        public DateTime? ReleaseDate { get; set; }
        
        [Column("play_count")]
        public int PlayCount { get; set; }
        
        [Column("artist_id")]
        public string? ArtistId { get; set; }
        
        [Column("album_id")]
        public string? AlbumId { get; set; }

        [Column("artist_name")]
        public string? ArtistName { get; set; }
        
        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}