namespace Chillify.Application.Interfaces.Services;

public interface IPlayerService
{
    Task HandleSongPlayedAsync(Guid songId, Guid? userId);
}