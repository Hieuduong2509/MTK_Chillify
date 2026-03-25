using application.interfaces.Repositories;
using Chillify.Application.Interfaces.Repositories;
using Chillify.Application.Models;

namespace Chillify.Application.Patterns.Observer;

public class AnalyticsObserver : IPlayerObserver
{
    private readonly ISongRepository _songRepository;
    private readonly IPlayHistoryRepository _historyRepository;

    public AnalyticsObserver(
        ISongRepository songRepository,
        IPlayHistoryRepository historyRepository)
    {
        _songRepository = songRepository;
        _historyRepository = historyRepository;
    }

    public async Task OnSongPlayedAsync(Guid songId, Guid? userId)
    {
        await _songRepository.IncrementPlayCountAsync(songId);

        await _historyRepository.AddAsync(new SongPlayHistory
        {
            Id = Guid.NewGuid(),
            SongId = songId,
            UserId = userId,
            PlayedAt = DateTime.UtcNow
        });
    }
}