using Chillify.Application.Models;

namespace Chillify.Application.Interfaces.Repositories;

public interface ISongRepository
{
    Task<Song?> GetByIdAsync(Guid songId);
    Task<List<Song>> GetRecommendedSongsAsync(Song currentSong);
    Task IncrementPlayCountAsync(Guid songId);
}