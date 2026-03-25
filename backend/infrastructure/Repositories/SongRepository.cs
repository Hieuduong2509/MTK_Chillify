using Microsoft.EntityFrameworkCore;
using Chillify.Application.Models;
using Chillify.Application.Interfaces.Repositories;
using Chillify.Infrastructure.Persistence;

namespace Chillify.Infrastructure.Repositories;

public class SongRepository : ISongRepository
{
    private readonly AppDbContext _context;

    public SongRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Song?> GetByIdAsync(Guid songId)
    {
        return await _context.Songs.FindAsync(songId);
    }
}