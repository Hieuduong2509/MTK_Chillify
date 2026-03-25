using Chillify.Application.Models;

namespace Chillify.Application.Interfaces.Repositories;

public interface IPlayHistoryRepository
{
    Task AddAsync(SongPlayHistory history);
}