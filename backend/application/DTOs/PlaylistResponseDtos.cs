public class PlaylistResponseDto
{
    public Guid Id { get; set; }
    public string PlaylistName { get; set; }
    public string? Description { get; set; }
    public string PlaylistType { get; set; }
    public DateTime CreatedAt { get; set; }
    
    public int SongCount { get; set; } 
}