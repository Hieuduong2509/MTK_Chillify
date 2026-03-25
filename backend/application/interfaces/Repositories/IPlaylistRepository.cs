using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Chillify.Application.Models;

namespace Chillify.Application.Interfaces.Repositories;

public interface IPlaylistRepository
{
    Task<IEnumerable<Playlist>> GetByUserIdAsync(Guid userId);
    Task<Playlist?> GetByIdAsync(Guid id);
    Task<Playlist?> GetByIdWithSongsAsync(Guid id);
    Task AddAsync(Playlist playlist);
    void Update(Playlist playlist);
    void Delete(Playlist playlist);
    Task SaveChangesAsync();
}