using System;

namespace application.models;

public class PlaylistSong
{
    public Guid Id { get; set; } 
    public Guid PlaylistId { get; set; }
    public Guid SongId { get; set; }
    public int Position { get; set; }
    public DateTime AddedAt { get; set; }

    public virtual Song Song { get; set; } = null!;
}