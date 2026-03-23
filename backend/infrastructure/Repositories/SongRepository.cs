using Chillify.Application.Interfaces.Repositories;
using Chillify.Application.Models;
using Chillify.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

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
        return await _context.Songs
            .FirstOrDefaultAsync(s => s.SongId == songId);
    }

    public async Task IncrementPlayCountAsync(Guid songId)
    {
        var song = await _context.Songs
            .FirstOrDefaultAsync(s => s.SongId == songId);

        if (song == null) return;

        song.PlayCount += 1;

        await _context.SaveChangesAsync();
    }

    public async Task<List<Song>> GetRecommendedSongsAsync(Song currentSong, int limit = 10)
    {
        var query = _context.Songs
            .Where(s => s.SongId != currentSong.SongId);

        var sameArtist = query
            .Where(s => s.ArtistId == currentSong.ArtistId);

        var sameAlbum = query
            .Where(s => s.AlbumId == currentSong.AlbumId);

        var trending = query
            .OrderByDescending(s => s.PlayCount);

        var result = await sameArtist
            .Union(sameAlbum)
            .Union(trending)
            .Take(limit)
            .ToListAsync();

        return result;
    }
}