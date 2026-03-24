using Chillify.Application.DTOs.Song;

namespace Chillify.Application.Interfaces.Services;

public interface IPlaylistService
{
    Task AddSongToPlaylistAsync(Guid playlistId, Guid songId);
    Task RemoveSongFromPlaylistAsync(Guid playlistId, Guid songId);

    Task<List<SongDto>> GetSongsInPlaylistAsync(Guid playlistId, string expectedType);
}