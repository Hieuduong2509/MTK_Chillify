using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace application.DTOs.Song
{
    public class SongResponseDto
    {
        public Guid SongId { get; set; }
        public string JamendoTrackId {get;  set;}
        public string Name { get; set; } = string.Empty;
        public string AudioUrl { get; set; } = string.Empty;
        public int? Duration { get; set; }
        public string? SongImage { get; set; }
        public DateTime? ReleaseDate { get; set; }
        public int PlayCount { get; set; }
        public string? ArtistName { get; set; }
    }
}