namespace Chillify.Application.Patterns.Observer;

public interface IPlayerObserver
{
    Task OnSongPlayedAsync(Guid songId, Guid? userId);
}