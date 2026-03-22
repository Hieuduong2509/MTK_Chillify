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
    {   await Task.Delay(800); 
        var song = await _songRepository.GetByIdAsync(songId);

        if (song == null)
            throw new Exception("Song not found");

        return await _songRepository.GetRecommendedSongsAsync(song);
    }
}