namespace Chillify.Application.Models;

public class PlaylistSong
{
    public Guid Id { get; set; }

    public Guid PlaylistId { get; set; }
    public Guid SongId { get; set; }

    public int Position { get; set; }

    public DateTime AddedAt { get; set; }
}