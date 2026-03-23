using Chillify.Application.Interfaces.Repositories;
using Chillify.Application.Interfaces.Services;
using Chillify.Application.Models;

namespace Chillify.Application.Services;

public class SongService : ISongService
{
    private readonly ISongRepository _songRepository;

    public SongService(ISongRepository songRepository)
    {
        _songRepository = songRepository;
    }

    public async Task<List<Song>> GetRecommendedSongsAsync(Guid songId)
    {
        var currentSong = await _songRepository.GetByIdAsync(songId);

        if (currentSong == null)
            throw new Exception("Song not found");

        return await _songRepository.GetRecommendedSongsAsync(currentSong);
    }
}