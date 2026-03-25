
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Chillify.Application.Models;

namespace Chillify.Application.Interfaces.Repositories;

public interface IPlaylistRepository
{

    Task<Playlist?> GetByIdAsync(Guid playlistId);

    Task<bool> IsSongInPlaylist(Guid playlistId, Guid songId);

    Task AddSongToPlaylistAsync(Guid playlistId, Guid songId);
    Task RemoveSongFromPlaylistAsync(Guid playlistId, Guid songId);

    Task<List<(Song song, int position)>> GetSongsByPlaylistIdAsync(Guid playlistId);
    Task<IEnumerable<Playlist>> GetByUserIdAsync(Guid userId);
    Task<Playlist?> GetByIdWithSongsAsync(Guid id);
    Task AddAsync(Playlist playlist);
    void Update(Playlist playlist);
    void Delete(Playlist playlist);
    Task SaveChangesAsync();

}