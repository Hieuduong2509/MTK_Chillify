using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Chillify.Application.Models;
using Chillify.Infrastructure.Persistence;
using application.interfaces.Repositories;
using application.models;
using Chillify.Application.Interfaces.Repositories;


namespace Chillify.Infrastructure.Repositories;

public class SongRepository : ISongRepository
{
    private readonly AppDbContext _context;

    public SongRepository(AppDbContext context)
    {
        _context = context;
    }


    public async Task AddAsync(Song song)
    {
        await _context.Songs.AddAsync(song);
    }

    public async Task AddRangeAsync(List<Song> songs)
    {
        await _context.Songs.AddRangeAsync(songs);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }

    public async Task<bool> ExistsByJamendoIdAsync(string jamendoTrackId)
    {
        return await _context.Songs.AnyAsync(s => s.JamendoTrackId == jamendoTrackId);
    }

    public async Task<List<Song>> GetSongDiscoverAsync(int limit)
    {
        return await _context.Songs
            .OrderBy(s => Guid.NewGuid()) 
            .Take(limit)
            .ToListAsync();
    }

    public async Task<List<Song>> GetSongNewAsync(int limit)
    {
        return await _context.Songs
            .OrderByDescending(s => s.ReleaseDate)
            .Take(limit)
            .ToListAsync();
    }

    public async Task<List<Song>> GetSongTrendingAsync(int limit)
    {
        return await _context.Songs
            .OrderByDescending(s => s.PlayCount)
            .Take(limit)
            .ToListAsync();
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
        //return await _context.Songs.FindAsync(songId);
    }

    public async Task<Song?> GetSongByIdAsync(Guid songId)
    {
        return await _context.Songs
            .FirstOrDefaultAsync(s => s.SongId == songId);
    }
}