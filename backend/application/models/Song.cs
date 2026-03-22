namespace Chillify.Application.Models;

public class Song
{
    public Guid SongId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string AudioUrl { get; set; } = string.Empty;

    public int? Duration { get; set; }
    public string? SongImage { get; set; }
    public DateTime? ReleaseDate { get; set; }

    public int PlayCount { get; set; }

    public Guid? ArtistId { get; set; }
    public Guid? AlbumId { get; set; }

    public DateTime CreatedAt { get; set; }
}