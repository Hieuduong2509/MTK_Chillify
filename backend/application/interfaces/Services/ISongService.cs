using Chillify.Application.Models;

namespace Chillify.Application.Interfaces.Services;

public interface ISongService
{
    Task<List<Song>> GetRecommendedSongsAsync(Guid songId);
}