namespace Chillify.Application.Models;

public class SongPlayHistory
{
    public Guid Id { get; set; }

    public Guid SongId { get; set; }
    public Guid? UserId { get; set; }

    public DateTime PlayedAt { get; set; }
}