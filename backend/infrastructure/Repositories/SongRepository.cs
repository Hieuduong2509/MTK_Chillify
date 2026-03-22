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
        return await _context.Songs.FindAsync(songId);
    }

    public async Task<List<Song>> GetRecommendedSongsAsync(Song currentSong)
    {
        var minDate = currentSong.ReleaseDate?.AddYears(-2);
        var maxDate = currentSong.ReleaseDate?.AddYears(2);

        var minDuration = currentSong.Duration.HasValue ? currentSong.Duration.Value - 30 : (int?)null;
        var maxDuration = currentSong.Duration.HasValue ? currentSong.Duration.Value + 30 : (int?)null;

        return await _context.Songs
            .Where(s => s.SongId != currentSong.SongId &&
                (
                    (currentSong.ArtistId != null && s.ArtistId == currentSong.ArtistId) ||
                    (currentSong.AlbumId != null && s.AlbumId == currentSong.AlbumId) ||
                    (minDate != null && maxDate != null && s.ReleaseDate >= minDate && s.ReleaseDate <= maxDate) ||
                    (minDuration != null && maxDuration != null && s.Duration >= minDuration && s.Duration <= maxDuration)
                )
            )
            .OrderByDescending(s =>
                (s.ArtistId == currentSong.ArtistId ? 3 : 0) +
                (s.AlbumId == currentSong.AlbumId ? 3 : 0) +
                ((s.ReleaseDate >= minDate && s.ReleaseDate <= maxDate) ? 2 : 0) +
                ((s.Duration >= minDuration && s.Duration <= maxDuration) ? 2 : 0)
            )
            .Take(20)
            .ToListAsync();
    }

    public async Task IncrementPlayCountAsync(Guid songId)
    {
        var song = await _context.Songs.FindAsync(songId);

        if (song == null) return;

        song.PlayCount += 1;
        await _context.SaveChangesAsync();
    }
}