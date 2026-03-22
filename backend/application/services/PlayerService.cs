using Chillify.Application.Interfaces.Services;
using Chillify.Application.Patterns.Observer;

namespace Chillify.Application.Services;

public class PlayerService : IPlayerService
{
    private readonly IEnumerable<IPlayerObserver> _observers;

    public PlayerService(IEnumerable<IPlayerObserver> observers)
    {
        _observers = observers;
    }

    public async Task HandleSongPlayedAsync(Guid songId, Guid? userId)
    {
        await Task.Delay(300);
        foreach (var observer in _observers)
        {
            await observer.OnSongPlayedAsync(songId, userId);
        }
    }
}