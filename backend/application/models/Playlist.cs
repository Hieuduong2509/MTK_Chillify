namespace Chillify.Application.Models;

public class Playlist
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }

    public string PlaylistName { get; set; } = string.Empty;
    public string? Description { get; set; }

    public string PlaylistType { get; set; } = "USER";

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}