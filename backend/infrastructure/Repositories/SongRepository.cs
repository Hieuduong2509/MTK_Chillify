using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Chillify.Application.Models;
using Chillify.Infrastructure.Persistence;
using application.interfaces.Repositories;
using application.models;

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
}