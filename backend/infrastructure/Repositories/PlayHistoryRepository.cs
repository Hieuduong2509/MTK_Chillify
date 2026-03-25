using Chillify.Application.Interfaces.Repositories;
using Chillify.Application.Models;
using Chillify.Infrastructure.Persistence;

namespace Chillify.Infrastructure.Repositories;

public class PlayHistoryRepository : IPlayHistoryRepository
{
    private readonly AppDbContext _context;

    public PlayHistoryRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(SongPlayHistory history)
    {
        await _context.SongPlayHistories.AddAsync(history);
        await _context.SaveChangesAsync();
    }
}