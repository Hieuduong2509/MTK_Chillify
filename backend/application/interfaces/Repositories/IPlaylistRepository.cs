using Chillify.Application.Models;

namespace Chillify.Application.Interfaces.Repositories;

public interface IPlaylistRepository
{
    Task<Playlist?> GetByIdAsync(Guid playlistId);
    Task<bool> IsSongInPlaylist(Guid playlistId, Guid songId);
    Task AddSongToPlaylistAsync(Guid playlistId, Guid songId);
    Task RemoveSongFromPlaylistAsync(Guid playlistId, Guid songId);
}