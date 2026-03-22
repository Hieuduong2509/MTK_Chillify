using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace application.models.jamendo
{
    public class JamendoTrack
    {
        public Guid SongId { get; set; } = Guid.NewGuid();

        [JsonPropertyName("id")]
        public string Id { get; set; } 

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("duration")]
        public int Duration { get; set; }

        [JsonPropertyName("artist_id")]
        public string ArtistId { get; set; } 

        [JsonPropertyName("artist_name")]
        public string ArtistName { get; set; }

        [JsonPropertyName("album_id")]
        public string AlbumId { get; set; } 

        [JsonPropertyName("album_name")]
        public string AlbumName { get; set; }

        [JsonPropertyName("audio")]
        public string Audio { get; set; }

        [JsonPropertyName("image")]
        public string Image { get; set; }

        [JsonPropertyName("releasedate")]
        public DateTime ReleaseDate { get; set; }
    }
}