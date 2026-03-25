using System;
using System.Collections.Generic;

namespace Chillify.Application.DTOs;

public class PlaylistResponseDto {
    public Guid Id { get; set; }
    public string PlaylistName { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string PlaylistType { get; set; } = "USER";
    public DateTime CreatedAt { get; set; }
}

public class PlaylistDetailResponseDto : PlaylistResponseDto {
    public List<PlaylistSongDto> Songs { get; set; } = new();
}

public class PlaylistSongDto {
    public Guid SongId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? AudioUrl { get; set; }
    public string? SongImage { get; set; }
    public int? Duration { get; set; }
}

public class CreatePlaylistDto {
    public string PlaylistName { get; set; } = string.Empty;
    public string? Description { get; set; }
}

public class UpdatePlaylistDto {
    public string PlaylistName { get; set; } = string.Empty;
    public string? Description { get; set; }
}