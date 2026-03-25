namespace Chillify.Application.DTOs.Song;

public class SongDto
{
    public Guid SongId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string AudioUrl { get; set; } = string.Empty;
    public string? SongImage { get; set; }
}