using Chillify.Application.Models;

namespace Chillify.Application.Interfaces.Repositories;

public interface ISongRepository
{
    Task<Song?> GetByIdAsync(Guid songId);
    Task<List<Song>> GetRecommendedSongsAsync(Song currentSong, int limit = 10);
    Task IncrementPlayCountAsync(Guid songId);
}