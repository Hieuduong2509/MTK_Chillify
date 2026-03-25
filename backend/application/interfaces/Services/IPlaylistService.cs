using Chillify.Application.DTOs;
using Chillify.Application.DTOs.Song;

namespace Chillify.Application.Interfaces.Services;

public interface IPlaylistService
{
    Task AddSongToPlaylistAsync(Guid playlistId, Guid songId);
    Task RemoveSongFromPlaylistAsync(Guid playlistId, Guid songId);

    Task<List<SongDto>> GetSongsInPlaylistAsync(Guid playlistId, string expectedType);
    Task<IEnumerable<PlaylistResponseDto>> GetUserPlaylistsAsync(Guid userId);
    Task<PlaylistDetailResponseDto?> GetPlaylistDetailAsync(Guid playlistId);
    Task<PlaylistResponseDto> CreateAsync(Guid userId, CreatePlaylistDto dto);
    Task<bool> UpdateAsync(Guid userId, Guid playlistId, UpdatePlaylistDto dto);
    Task<bool> DeleteAsync(Guid userId, Guid playlistId);
}