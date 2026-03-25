namespace Chillify.Application.Models;
using application.models;
public enum PlaylistType
{
    User,
    Liked,
    System
}

public class Playlist
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string PlaylistName { get; set; } = string.Empty;
    public string? Description { get; set; }
    
    public PlaylistType PlaylistType { get; set; } = PlaylistType.User;
    
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public virtual ICollection<PlaylistSong> PlaylistSongs { get; set; } = new List<PlaylistSong>();
}